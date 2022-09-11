// 先看看 ES6 的 flatMap
console.log([1, 2, [3], 4].flatMap(x => x + 1)); //[ 2, 3, '31', 5 ]
/* 
就会发现，他不是 [2, 3, 4, 5]
原因在于，他是先 map 再 flat
所以可以这样实现
*/

Array.prototype._flatMap = function (mapper) {
	return this.map(mapper).flat();
};

console.log([1, 2, [3], 4]._flatMap(x => x + 1)); //[ 2, 3, '31', 5 ]
