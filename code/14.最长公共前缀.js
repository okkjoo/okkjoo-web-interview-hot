/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
	if (strs.length === 0) return '';
	let ans = strs[0];
	for (let i = 1; i < strs.length; i++) {
		let j = 0;
		for (; j < ans.length; j++) {
			if (ans[j] != strs[i][j]) break;
		}
		ans = ans.substring(0, j);
		if (ans === '') return ans;
	}
	return ans;
};
// @lc code=end
