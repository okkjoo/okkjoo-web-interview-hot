/*
 * @lc app=leetcode.cn id=1800 lang=javascript
 *
 * [1800] 最大升序子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function (nums) {
	const len = nums.length;
	let res = nums[0];
	for (let i = 1, cur = nums[0]; i < len; i++) {
		if (nums[i] > nums[i - 1]) cur += nums[i];
		else cur = nums[i];
		res = Math.max(res, cur);
	}
	return res;
};
// @lc code=end
