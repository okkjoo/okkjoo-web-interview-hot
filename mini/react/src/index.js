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
	/* 创建一个 DOM 节点，抽离出来当一个函数 */
	function createDom(fiber) {
		//根据 element.type 属性创建 DOM 节点
		const dom =
			fiber.type === 'TEXT_ELEMENT'
				? document.createTextNode('') //特殊处理 text 节点
				: document.createElement(fiber.type);

		// element props 给到 dom 除了 children
		const isProperty = key => key !== 'children';
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
		};
		// 将 nextUnitOfWork 设置为 fiber 树的根节点
		nextUnitOfWork = wipRoot;
	}

	/* commitRoot 提交变更到真实 DOM 树上 */
	function commitRoot() {
		commitWork(wipRoot.child);
		wipRoot = null;
	}

	function commitWork(fiber) {
		if (!fiber) return;
		const domParent = fiber.parent.dom;
		domParent.appendChild(fiber.dom);
		// 递归地将所有节点添加到 dom 上
		commitWork(fiber.child);
		commitWork(fiber.sibling);
	}

	/* Concurrent Mode 并发模型 */

	let nextUnitOfWork = null; //第一次就是变为 根节点
	let wipRoot = null;

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
		// add DOM node
		if (!fiber.dom) {
			// 创建 fiber 对应的 DOM 节点
			// 用 fiber.dom 维护创建的 DOM 节点
			fiber.dom = createDom(fiber);
		}

		// create new fibers
		const elements = fiber.props.children;
		let index = 0;
		let preSibling = null;

		while (index < elements.length) {
			// 给每个子节点创建对应的新 fiber 节点
			const element = elements[index];
			const newFiber = {
				type: element.type,
				props: element.props,
				parent: fiber, //就是比element多了这些指针
				dom: null,
			};

			if (index === 0) {
				// 如果是第一个子节点
				fiber.child = newFiber; // 设为父节点的 child 属性
			} else {
				// 或者设为上一个节点的 兄弟节点 sibling
				preSibling.sibling = newFiber;
			}
			preSibling = newFiber;
			index++;
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

	exports.createElement = createElement;
	exports.render = render;
});
