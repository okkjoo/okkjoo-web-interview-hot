/*
 * @lc app=leetcode.cn id=718 lang=javascript
 *
 * [718] 最长重复子数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
	const m = nums1.length,
		n = nums2.length;
	let ans = 0;
	// 直接像下面这样初始化 二维数组中的数组都是同一个引用，所以是不行的！
	// let dp = Array(m + 1).fill(Array(n + 1).fill(0));
	const dp = new Array(m + 1);
	for (let i = 0; i <= m; i++) {
		dp[i] = new Array(n + 1).fill(0);
	}
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (nums1[i - 1] === nums2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
			}
			ans = Math.max(ans, dp[i][j]);
		}
	}
	return ans;
};
// @lc code=end
