/*
 * @lc app=leetcode.cn id=31 lang=javascript
 *
 * [31] 下一个排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
	const n = nums.length - 1;
	let i = n - 1;
	while (i >= 0 && nums[i] >= nums[i + 1]) i--;
	if (i >= 0) {
		let j = n;
		while (j >= 0 && nums[i] >= nums[j]) j--;
		[nums[i], nums[j]] = [nums[j], nums[i]];
	}
	//JS的reverse不能翻转一部分...
	let l = i + 1,
		r = n;
	while (l < r) {
		[nums[l], nums[r]] = [nums[r], nums[l]];
		l++, r--;
	}
};
// @lc code=end
