/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
	let slow = 0,
		fast = 0;
	while (fast < nums.length) {
		if (nums[fast] != 0) {
			if (nums[fast] !== 0) {
				[nums[fast], nums[slow]] = [nums[slow], nums[fast]];
				slow++;
			}
		}
		fast++;
	}
};
// @lc code=end
