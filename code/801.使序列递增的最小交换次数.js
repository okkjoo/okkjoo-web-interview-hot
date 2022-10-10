/*
 * @lc app=leetcode.cn id=801 lang=javascript
 *
 * [801] 使序列递增的最小交换次数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minSwap = function (nums1, nums2) {
	const n = nums1.length;
	const dp = new Array(n);
	dp[0] = [0, 1];
	for (let i = 1; i < n; i++) dp[i] = [n + 10, n + 10];
	for (let i = 1; i < n; i++) {
		//顺序位满足要求
		if (nums1[i] > nums1[i - 1] && nums2[i] > nums2[i - 1]) {
			dp[i][0] = dp[i - 1][0]; //前后都不交换
			dp[i][1] = dp[i - 1][1] + 1; //都交换
		}
		//交叉位满足要求
		if (nums1[i] > nums2[i - 1] && nums2[i] > nums1[i - 1]) {
			dp[i][0] = Math.min(dp[i][0], dp[i - 1][1]); //前一位交换
			dp[i][1] = Math.min(dp[i][1], dp[i - 1][0] + 1); //当前位交换
		}
	}
	return Math.min(dp[n - 1][0], dp[n - 1][1]);
};
// @lc code=end
