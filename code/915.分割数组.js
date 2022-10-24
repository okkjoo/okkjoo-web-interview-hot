/*
 * @lc app=leetcode.cn id=915 lang=javascript
 *
 * [915] 分割数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var partitionDisjoint = function (nums) {
	const n = nums.length;
	let leftM = nums[0],
		leftP = 0,
		curM = nums[0];
	for (let i = 1; i < n - 1; i++) {
		curM = Math.max(curM, nums[i]);
		if (nums[i] < leftM) {
			leftM = curM;
			leftP = i;
		}
	}
	return leftP + 1;
};
// @lc code=end
