/*
 * @lc app=leetcode.cn id=902 lang=javascript
 *
 * [902] 最大为 N 的数字组合
 */

// @lc code=start
/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
var atMostNGivenDigitSet = function (digits, n) {
	const s = n + ''; //转为字符串
	const len = s.length,
		m = digits.length;
	const dp = new Array(len + 1).fill(0);
	dp[len] = 1; //只有最低位时当然只有一个
	//位数相同的情况，从最低位开始往前
	for (let i = len - 1; i >= 0; i--) {
		let cur = s[i];
		for (let j = 0; j < digits.length; j++) {
			//小于的话直接加
			if (digits[j] < cur) {
				dp[i] += Math.pow(m, len - 1 - i);
			}
			//相同直接从前一位拿
			else if (digits[j] == cur) {
				dp[i] += dp[i + 1];
			}
		}
	}
	// 位数小于 n 的情况
	for (let i = 1; i < len; i++) {
		dp[0] += Math.pow(m, i);
	}
	return dp[0];
};
// @lc code=end
