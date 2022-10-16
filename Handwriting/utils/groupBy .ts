/**
 * 按照 by 函数分类
 * @param collection 集合数组
 * @param by 分类函数
 * @returns 分类好的对象
 */
const groupBy = (collection: Array<any>, by: Function) => {
	return collection.reduce((acc, x) => {
		if (acc[by(x)]) acc[by(x)].push(x);
		else acc[by(x)] = [x];
		return acc;
	}, {});
};

//test
console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
// => { '4': [4.2], '6': [6.1, 6.3] }
