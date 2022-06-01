/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
	let left = 0,
		right = nums.length - 1;
	while (left <= right) {
		const mid = Math.floor(right - left) + left / 2;
		const v = nums[mid];
		if (v == target) return mid;
		else if (v > target) right = mid - 1;
		else if (v < target) left = mid + 1;
	}
	return -1;
};
// @lc code=end
