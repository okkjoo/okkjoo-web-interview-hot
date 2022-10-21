/**
 * 实现 Array.prototype.map ES5 版本
 * @param {function} callback 生成新数组元素的数组，使用三个参数
 * @param {any} thisArg 执行 callback 时值被用作 this
 * @returns 新数组
 */
Array.prototype._map = function (callback, thisArg) {
	if (typeof callback !== 'function')
		throw Error('callback must be a function');
	var arr = [];
	for (var i = 0; i < this.length; i++) arr[i] = callback(this[i], i, this);
	return arr;
};

//test
var a = [1, 2, 3]._map((cur, idx, arr) => {
	return [].concat(arr, cur * idx);
});
console.log(a);
//[ [ 1, 2, 3, 0 ], [ 1, 2, 3, 2 ], [ 1, 2, 3, 6 ] ]
