/**
 * 效果：
var array = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];

_.keyBy(array, function(o) {
  return String.fromCharCode(o.code);
});
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }

_.keyBy(array, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 */
/**
 * 创建一个由通过 by 处理 list 的每个元素的结果生成的键组成的对象。
 * @param list 要遍历的对象数组
 * @param by 转换关键字
 * @returns
 */
const keyBy = (list: Array<any>, by: Function | string) => {
	return list.reduce((acc, x) => {
		acc[typeof by === 'string' ? x[by] : by(x)] = x;
		return acc;
	}, {});
};

//test
var array = [
	{ dir: 'left', code: 97 },
	{ dir: 'right', code: 100 },
];
console.log(keyBy(array, 'dir'));
/* 
{ left: { dir: 'left', code: 97 },
  right: { dir: 'right', code: 100 } }
*/

console.log(
	keyBy(array, function (o: { code: number }) {
		return String.fromCharCode(o.code);
	})
);
/* 
{ a: { dir: 'left', code: 97 }, d: { dir: 'right', code: 100 } }
*/
