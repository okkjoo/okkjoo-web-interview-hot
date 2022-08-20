/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
	const len = nums.length;
	if (len === 0) return 0;
	const dp = new Array(len + 1);
	dp[0] = 0;
	dp[1] = nums[0];
	for (let i = 2; i <= len; i++)
		dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
	return dp[len];
};
// @lc code=end
