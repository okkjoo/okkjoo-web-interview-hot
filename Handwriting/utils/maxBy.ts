/**
 * 返回给定条件最大的数组项
 * @param list 数组
 * @param keyBy 条件函数
 * @param only 即使有多个也只返回一个
 * @returns 返回给定条件最大的数组项
 */
const maxBy = (list: Array<any>, keyBy: Function, only = true) =>
	only
		? list.reduce((x, y) => (keyBy(x) > keyBy(y) ? x : y))
		: list
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

/**
 *
 * 找出页面中出现次数最多的 HTML 标签
 */
const getFrequentTag = () => {
	const tags = [...document.querySelectorAll('*')].map(x => x.tagName);
	console.log(tags);
	const tagsCnt = tags.reduce((o, tag) => {
		o[tag] = o[tag] ? o[tag] + 1 : 1;
		return o;
	}, {});
	console.log(tagsCnt);
	return maxBy(Object.entries(tagsCnt), (tag: any[]) => tag[1]);
};
console.log(getFrequentTag());
