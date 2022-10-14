/*
 * @lc app=leetcode.cn id=940 lang=javascript
 *
 * [940] 不同的子序列 II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function (s) {
	const MOD = 1000000007;
	let ans = 0;
	let dp = new Array(26).fill(0);
	for (let i = 0; i < s.length; i++) {
		const cId = s[i].charCodeAt() - 'a'.charCodeAt();
		const prev = dp[cId];
		dp[cId] = (ans + 1) % MOD;
		ans = (((ans + dp[cId] - prev) % MOD) + MOD) % MOD;
	}
	return ans;
};
// @lc code=end
