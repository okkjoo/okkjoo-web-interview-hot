/*
 * @lc app=leetcode.cn id=921 lang=javascript
 *
 * [921] 使括号有效的最少添加
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s) {
	let cnt = 0,
		left = 0; //未使用的左括号数
	for (const c of s) {
		left -= c === ')' ? 1 : -1;
		if (left < 0) {
			cnt++, left++;
		}
	}
	return cnt + left;
};
// @lc code=end
