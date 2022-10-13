/**
 * 返回给定条件最大的数组项(若有多个则都返回)
 * @param list 数组
 * @param keyBy 条件函数
 * @returns 返回给定条件最大的数组项
 */
const maxBy = (list: Array<any>, keyBy: Function) =>
	list
		.slice(1)
		.reduce(
			(acc, x) =>
				keyBy(x) > keyBy(acc[0])
					? [x]
					: keyBy(x) === keyBy(acc[0])
					? [...acc, x]
					: acc,
			[list[0]]
		);

//test
const data = [{ value: 6 }, { value: 6 }, { value: 2 }, { value: 4 }];

console.log(maxBy(data, (x: any) => x.value)); //{value: 6}
