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

	/* ReactDOM.render  */
	function render(element, container) {
		//根据 element.type 属性创建 DOM 节点
		const dom =
			element.type === 'TEXT_ELEMENT'
				? document.createTextNode('') //特殊处理 text 节点
				: document.createElement(element.type);

		// element props 给到 dom 除了 children
		const isProperty = key => key !== 'children';
		Object.keys(element.props)
			.filter(isProperty)
			.forEach(name => {
				dom[name] = element.props[name];
			});
		//递归处理子节点
		element.props.children.forEach(child => render(child, dom));
		//将节点加入容器中
		container.appendChild(dom);
	}

	/* Concurrent Mode 并发模型 */

	let nextUnitOfWork = null;

	function workLoop(deadline) {
		let shouldYield = false;
		while (nextUnitOfWork && !shouldYield) {
			nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
			shouldYield = deadline.timeRemaining() < 1;
		}
		requestIdleCallback(workLoop);
	}

	// 设置渲染的第一个任务单元，然后开始循环。
	requestIdleCallback(workLoop); //让浏览器空闲的时候执行 workLoop 函数

	// 执行每一小块的任务单元，并返回下一个任务单元
	function performUnitOfWork(nextUnitOfWork) {
		//TODO
	}

	exports.createElement = createElement;
	exports.render = render;
});
