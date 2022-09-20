type JSONItem<T> = {
	[P in keyof T]: T[P];
} & {
	children?: T;
	id: number;
	parent_id: number;
};
const flatArrToJSONTree = <T, V>(
	arr: Array<JSONItem<T>>,
	rootId: V
): Array<any> => {
	const result: Array<JSONItem<T>> = [];
	// 建立 id - value 的映射
	const map = arr.reduce((o, cur) => {
		o[cur.id] = cur;
		return o;
	}, {});
	for (let item of arr) {
		if (item.parent_id === rootId) {
			result.push(item);
		}
		if (item.parent_id in map) {
			const parent = map[item.parent_id];
			(parent.children || (parent.children = [])).push(item);
		}
	}
	return result;
};

//test
let flatArr = [
	{ id: 1, title: 'title1', parent_id: 0 },
	{ id: 2, title: 'title2', parent_id: 0 },
	{ id: 3, title: 'title2-1', parent_id: 2 },
	{ id: 4, title: 'title3-1', parent_id: 3 },
	{ id: 5, title: 'title4-1', parent_id: 4 },
	{ id: 6, title: 'title3-2', parent_id: 3 },
];
console.log(flatArrToJSONTree(flatArr, 0));
/* 
id: 1, title: 'title1', parent_id: 0 },
  { id: 2,
    title: 'title2',
    parent_id: 0,
    children: 
			[ { id: 3,
					title: 'title2-1',
					parent_id: 2,
					children: 
          [ { id: 4, title: 'title3-1', parent_id: 3, children: [Object] },
            { id: 6, title: 'title3-2', parent_id: 3 } ] } ] } ]
*/
