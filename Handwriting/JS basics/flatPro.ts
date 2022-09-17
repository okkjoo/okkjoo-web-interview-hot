/* 之前实现的只能够扁平一层，
现在实现一个和 Array.prototype.flat 一样
可以传入扁平深度的
*/
/**
 * 将数组扁平化
 * @param arr 深层数组
 * @param depth 扁平深度 默认为1
 * @returns 扁平之后的数组
 */
function flat(arr: Array<any>, depth = 1): Array<any> {
	if (depth === 0) return arr;
	return arr.reduce(
		(res, cur) => res.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur),
		[]
	);
}

//test
console.log(flat([1, [1, 1, [1]]])); //[ 1, 1, 1, [ 1 ] ]
console.log(flat([1, [1, 1, [1]]], Infinity)); //[ 1, 1, 1, 1 ]
