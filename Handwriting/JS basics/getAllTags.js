/**
 * 用 element.children 递归获取页面标签
 * @param {*} el
 * @returns
 */
const getAllTags = (el = document) => {
	const children = Array.prototype.flatMap.call(el.children, x =>
		getAllTags(x)
	);
	return [el, ...children];
};

//test
console.log(getAllTags());
