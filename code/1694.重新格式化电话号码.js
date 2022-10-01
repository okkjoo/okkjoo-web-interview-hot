/*
 * @lc app=leetcode.cn id=1694 lang=javascript
 *
 * [1694] 重新格式化电话号码
 */

// @lc code=start
/**
 * @param {string} number
 * @return {string}
 */
var reformatNumber = function (number) {
	const s = number.replaceAll(/\-|\s/g, '');
	const res = Array.from({ length: Math.ceil(s.length / 3) }, x => 0).map(
		(_, i) => s.slice(i * 3, i * 3 + 3)
	);

	if (res[res.length - 1].length === 1) {
		res[res.length - 1] = res[res.length - 2].slice(-1) + res[res.length - 1];
		res[res.length - 2] = res[res.length - 2].slice(0, 2);
	}
	// console.log(arr)
	return res.join('-');
};
// @lc code=end
