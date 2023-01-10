/* 把一个对象扁平化 */
function flatObject(obj) {
	if (!isObject(obj)) return;
	const res = {};
	dfs(obj, '');
	function dfs(cur, prefix) {
		if (isObject(cur)) {
			if (Array.isArray(cur)) {
				cur.forEach((item, idx) => void dfs(item, `${prefix}[${idx}]`));
			} else {
				for (const k in cur) {
					dfs(cur[k], `${prefix}${prefix ? '.' : ''}${k}`);
				}
			}
		} else {
			res[prefix] = cur;
		}
	}
	return res;
}
function isObject(o) {
	return typeof o === 'object' && o !== null;
}

//test
const obj = {
	a: {
		b: 1,
		c: 2,
		d: { e: 5 },
	},
	b: [1, 3, { a: 2, b: 3 }],
	c: 3,
};

console.log(flatObject(obj));
/* 
{ 
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'b[0]': 1,
  'b[1]': 3,
  'b[2].a': 2,
  'b[2].b': 3,
  c: 3 
}
*/
