/**
 * 多个数组取交集
 * @param list 多个数组
 * @returns 多个数组的交集
 */
const intersection = (...list: Array<Array<any>>) => {
	const result = list.reduce((a, b) => a.filter(v => b.includes(v)));
	return [...new Set(result)];
};

//test

console.log(intersection([1, 2, 2], [1, 2, 2], [1, 2])); //[1, 2]
console.log(intersection([1, 2, 3, 2], [1, 2, 2, 3], [1, 2, 3, 3])); //[1,2,3]
