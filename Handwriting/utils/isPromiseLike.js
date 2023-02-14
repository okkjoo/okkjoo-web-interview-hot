/**
 * 判断一个值是否为 Promise like —— 类似 Promise 的东西
 * @param {any} value
 */
function isPromiseLike(value) {
	// 是函数 或 对象
	// 有 then 方法
	return (
		value !== null &&
		(typeof value === 'object' || typeof value === 'function') &&
		typeof value.then === 'function'
	);
}
