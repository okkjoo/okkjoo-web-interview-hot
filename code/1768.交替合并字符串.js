/*
 * @lc app=leetcode.cn id=1768 lang=javascript
 *
 * [1768] 交替合并字符串
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
	let i = 0,
		j = 0;
	let s = '';
	const l1 = word1.length,
		l2 = word2.length;
	while (i < l1 || j < l2) {
		s = s + word1[i++];
		s = s + word2[j++];
		if (i === l1) {
			while (j < l2) s = s + word2[j++];
		}
		if (j === l2) {
			while (i < l1) s = s + word1[i++];
		}
	}
	return s;
};
// @lc code=end
