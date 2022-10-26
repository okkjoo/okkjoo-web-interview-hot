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
 * @param {string | number} text 基本只
 * @returns 包裹为 type 为特殊类型 TEXT_ELEMENT 的JS对象
 */
function createTextElement(text) {
	return {
		type: 'TEXT_ELEMENT',
		props: {
			nodeValue: text,
			children: {},
		},
	};
}
