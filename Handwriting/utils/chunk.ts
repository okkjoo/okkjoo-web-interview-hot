/**
 *  创建一个元素数组，将元素分成长度为size的组。
 * 如果数组不能被平均分割，最后的块将是剩余的元素。
 * @param list 待分组的数组
 * @param size 每组大小
 * @returns 切割后的数组
 */
const chunk = (list: Array<any>, size: number) => {
	const l: Array<Array<any>> = [];
	for (let i = 0; i < list.length; i++) {
		const idx = Math.floor(i / size);
		l[idx] ??= [];
		l[idx].push(list[i]);
	}
	return l;
};

//test
console.log(chunk(['a', 'b', 'c', 'd'], 2));
// => [['a', 'b'], ['c', 'd']]

console.log(chunk(['a', 'b', 'c', 'd'], 3));
// => [['a', 'b', 'c'], ['d']]
