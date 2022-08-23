/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 颠倒字符串中的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
	return s.trim().split(/\s+/).reverse().join(' ');
};
// @lc code=end
