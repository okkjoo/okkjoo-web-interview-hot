/**
 * 实现 Array.prototype.map reduce 版本
 * @param {function} callback 生成新数组元素的数组，使用三个参数
 * @param {any} thisArg 执行 callback 时值被用作 this
 * @returns 新数组
 */
Array.prototype._map = function (callback, thisArg) {
	return this.reduce((acc, cur, idx, arr) => {
		acc.push(callback.call(thisArg, cur, idx, arr));
		return acc;
	}, []);
};

//test
const a = [1, 2, 3]._map((cur, idx, arr) => {
	return [].concat(arr, cur * idx);
});
console.log(a);
//[ [ 1, 2, 3, 0 ], [ 1, 2, 3, 2 ], [ 1, 2, 3, 6 ] ]
