(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined'
		? factory(exports)
		: typeof define === 'function' && define.amd
		? define(['exports'], factory)
		: ((global = global || self), factory((global.Reactz = {})));
})(this, function (exports) {
	'use strict';
	/* createElement */
	function createElement(type, props, ...children) {
		return {
			type,
			props: {
				...props,
				children: children.map(child =>
					typeof child === 'object' ? child : createTextElement(child)
				),
			},
		};
	}

	/**
	 *
	 * @param {string | number} text 基本值
	 * @returns 包裹为 type 为特殊类型 TEXT_ELEMENT 的JS对象
	 */
	function createTextElement(text) {
		return {
			type: 'TEXT_ELEMENT',
			props: {
				nodeValue: text,
				children: [],
			},
		};
	}

	/* utils 后面用到的小工具方法*/
	const isEvent = key => key.startsWith('on');
	const isProperty = key => key !== 'children' && !isEvent(key); // 属性除了 children、事件属性
	const isNew = (prev, next) => key => prev[key] !== next[key]; // 属性更新了
	const isGone = (prev, next) => key => !(key in next); // 属性删除了

	/* 创建一个 DOM 节点，抽离出来当一个函数 */
	function createDom(fiber) {
		//根据 element.type 属性创建 DOM 节点
		const dom =
			fiber.type === 'TEXT_ELEMENT'
				? document.createTextNode('') //特殊处理 text 节点
				: document.createElement(fiber.type);

		// 一开始要调用一下 初始化一些东西
		updateDom(dom, {}, fiber.props);

		// element props 给到 dom 除了 children
		Object.keys(fiber.props)
			.filter(isProperty)
			.forEach(name => {
				dom[name] = fiber.props[name];
			});

		return dom;
	}

	/* ReactDOM.render  */
	function render(element, container) {
		// 先记录到 wipRoot 上
		wipRoot = {
			dom: container,
			props: {
				children: [element],
			},
			alternate: currentRoot,
		};
		deletions = []; //初始化
		// 将 nextUnitOfWork 设置为 fiber 树的根节点
		nextUnitOfWork = wipRoot;
	}

	function updateDom(dom, prevProps, nextProps) {
		// 删除过时的事件监听（已经删除或者更新）
		Object.keys(prevProps)
			.filter(isEvent)
			.filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
			.forEach(name => {
				const eventType = name.toLowerCase().substring(2);
				dom.removeEventListener(eventType, prevProps[name]);
			});
		// 删除没用的旧属性
		Object.keys(prevProps)
			.filter(isProperty)
			.filter(isGone(prevProps, nextProps))
			.forEach(name => {
				dom[name] = '';
			});

		// 添加 or 更新属性
		Object.keys(nextProps)
			.filter(isProperty)
			.filter(isNew(prevProps, nextProps))
			.forEach(name => {
				dom[name] = nextProps[name];
			});

		// 添加新的事件监听
		Object.keys(nextProps)
			.filter(isEvent)
			.filter(isNew(prevProps, nextProps))
			.forEach(name => {
				const eventType = name.toLowerCase().substring(2);
				dom.addEventListener(eventType, nextProps[name]);
			});
	}

	/* commitRoot 提交变更到真实 DOM 树上 */
	function commitRoot() {
		// 将删除旧 DOM 的变更提交
		deletions.forEach(commitWork);
		commitWork(wipRoot.child);
		currentRoot = wipRoot;
		wipRoot = null;
	}

	function commitWork(fiber) {
		if (!fiber) return;
		let domParentFiber = fiber.parent;
		while (!domParentFiber.dom) {
			domParentFiber = domParentFiber.parent;
		}
		const domParent = domParentFiber.dom;

		// 根据 fiber.effectTag 执行对应的操作 增、删、改
		if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
			domParent.appendChild(fiber.dom);
		} else if (fiber.effectTag === 'DELETION') {
			commitDeletion(fiber, domParent);
		} else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
			updateDom(fiber.dom, fiber.alternate.props, fiber.props);
		}
		// 递归地将所有节点添加到 dom 上
		commitWork(fiber.child);
		commitWork(fiber.sibling);
	}

	function commitDeletion(fiber, domParent) {
		//找到该 fiber 下第一个有 DOM 节点的 fiber 节点进行删除
		if (fiber.dom) {
			domParent.removeChild(fiber.dom);
		} else {
			commitDeletion(fiber.child, domParent);
		}
	}
	/* Concurrent Mode 并发模型 */

	let nextUnitOfWork = null; //第一次就是变为 根节点
	let currentRoot = null; // 存放上一次提交到 DOM 的 fiber 树
	let wipRoot = null; // 追踪修改的树
	let deletions = []; //收集保存要删除的 dom 节点

	/**
	 * 当浏览器有空闲的时候，会调用 workLoop 我们就开始遍历整颗树。
	 * @param {} deadline requestIdleCallback 会给到的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
	 */
	function workLoop(deadline) {
		let shouldYield = false;
		while (nextUnitOfWork && !shouldYield) {
			nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行并返回下一个任务单元
			shouldYield = deadline.timeRemaining() < 1;
		}

		// 没有下一个任务单元了 —— 这棵树上的任务完成了
		if (!nextUnitOfWork && wipRoot) {
			commitRoot();
		}
		requestIdleCallback(workLoop);
	}

	// 设置渲染的第一个任务单元，然后开始循环。
	requestIdleCallback(workLoop); //让浏览器空闲的时候执行 workLoop 函数

	// 执行每一小块的任务单元，并返回下一个任务单元
	function performUnitOfWork(fiber) {
		const isFunctionComponent = fiber.type instanceof Function;
		if (isFunctionComponent) {
			updateFunctionComponent(fiber);
		} else {
			updateHostComponent(fiber);
		}

		// return next unit of work
		//child -> sibling -> uncle
		if (fiber.child) return fiber.child;
		let nextFiber = fiber;
		while (nextFiber) {
			if (nextFiber.sibling) return nextFiber.sibling;
			nextFiber = nextFiber.parent;
		}
	}

	let wipFiber = null;
	let hookIndex = null;

	// 用于从函数组件中生成子组件
	function updateFunctionComponent(fiber) {
		wipFiber = fiber;
		hookIndex = 0;
		wipFiber.hooks = [];
		// fiber.type 是一个函数，并且运行之后返回一个 JSX element
		const children = [fiber.type(fiber.props)];
		reconcileChildren(fiber, children);
	}

	function useState(initial) {
		const oldHook =
			wipFiber.alternate &&
			wipFiber.alternate.hooks &&
			wipFiber.alternate.hooks[hookIndex];

		const hook = {
			state: oldHook ? oldHook.state : initial,
			queue: [],
		};
		// 第二次渲染开始就会将所有 action 从旧的 hook 队列中取出
		const actions = oldHook ? oldHook.queue : [];
		// 依次调用 action
		actions.forEach(action => {
			hook.state = action(hook.state);
		});
		const setState = action => {
			hook.queue.push(action);
			wipRoot = {
				dom: currentRoot.dom,
				props: currentRoot.props,
				alternate: currentRoot,
			};
			nextUnitOfWork = wipRoot;
			deletions = [];
		};
		wipFiber.hooks.push(hook);
		hookIndex++;
		return [hook.state, setState];
	}

	function updateHostComponent(fiber) {
		// add DOM node
		if (!fiber.dom) {
			// 创建 fiber 对应的 DOM 节点
			// 用 fiber.dom 维护创建的 DOM 节点
			fiber.dom = createDom(fiber);
		}
		// create new fibers
		reconcileChildren(fiber, fiber.props.children);
	}
	/**
	 * 调和（reconcile）旧的 fiber 节点 和新的 react elements。
	 * @param {*} wipFiber
	 * @param {*} elements
	 */
	function reconcileChildren(wipFiber, elements) {
		// create new fibers
		let index = 0;
		let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
		let preSibling = null;

		// 这里 oldFiber 是有可能为 undefined 的，所以用 != 而不是 !== (这里有点无语，一开始错误调试半天才发现问题)
		while (index < elements.length || oldFiber != null) {
			// 给每个子节点创建对应的新 fiber 节点
			const element = elements[index];
			let newFiber = null;

			// 比较 oldFiber 和 element
			const sameType = oldFiber && element && element.type === oldFiber.type;
			if (sameType) {
				// 类型相同： 更新节点的属性就好了
				newFiber = {
					type: oldFiber.type,
					props: element.props,
					dom: oldFiber.dom,
					parent: wipFiber,
					alternate: oldFiber,
					effectTag: 'UPDATE', // 在 commit 时会用到
				};
			}
			if (element && !sameType) {
				// 类型不同： 添加新节点
				newFiber = {
					type: element.type,
					props: element.props,
					dom: null,
					parent: wipFiber,
					alternate: null,
					effectTag: 'PLACEMENT',
				};
			}
			if (oldFiber && !sameType) {
				// 如果有旧节点，还要删除旧节点
				oldFiber.effectTag = 'DELETION'; // 不用生成新的 fiber，在旧 fiber 中标记即可
				deletions.push(oldFiber); // 将要删除 fiber 节点的收集起来，就不用在 commit 时遍历旧 fiber 了
			}
			if (oldFiber) {
				oldFiber = oldFiber.sibling;
			}

			if (index === 0) {
				// 如果是第一个子节点
				wipFiber.child = newFiber; // 设为父节点的 child 属性
			} else if (element) {
				// 或者设为上一个节点的 兄弟节点 sibling
				preSibling.sibling = newFiber;
			}
			preSibling = newFiber;
			index++;
		}
	}

	exports.createElement = createElement;
	exports.render = render;
	exports.useState = useState;
});
