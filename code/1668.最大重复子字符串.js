/*
 * @lc app=leetcode.cn id=1668 lang=javascript
 *
 * [1668] 最大重复子字符串
 */

// @lc code=start
/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 */
var maxRepeating = function (sequence, word) {
	const n = sequence.length,
		m = word.length;
	if (n < m) return 0;
	const dp = new Array(n).fill(0);
	for (let i = m - 1; i < n; i++) {
		let flag = true;
		for (let j = 0; j < m; j++) {
			if (sequence[i - m + j + 1] !== word[j]) {
				flag = false;
				break;
			}
			if (!flag) b.push;
		}
		if (flag) dp[i] = i === m - 1 ? 1 : dp[i - m] + 1;
	}
	const max = arr => arr.reduce((mx, x) => (mx > x ? mx : x), 0);
	return max(dp);
};
// @lc code=end
