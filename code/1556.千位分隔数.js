/*
 * @lc app=leetcode.cn id=1556 lang=javascript
 *
 * [1556] 千位分隔数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
	const s = n + '';
	let res = [];
	for (let i = s.length - 1; i >= 0; i = i - 3) {
		res.push(s[i]);
		res.push(s[i - 1]);
		res.push(s[i - 2]);
		res.push('.');
	}
	res.pop();
	return res.reverse().join('');
};
// @lc code=end
