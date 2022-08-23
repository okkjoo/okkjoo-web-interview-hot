/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
	const N = nums.length;
	for (let i = 0; i < N; i++) {
		if (nums[i] <= 0) nums[i] = N + 1;
	}
	for (let i = 0; i < N; i++) {
		let x = Math.abs(nums[i]);
		if (x >= 1 && x <= N) {
			nums[x - 1] = nums[x - 1] < 0 ? nums[x - 1] : -nums[x - 1];
		}
	}
	for (let i = 0; i < N; i++) {
		if (nums[i] >= 0) return i + 1;
	}
	return N + 1;
};
// @lc code=end
