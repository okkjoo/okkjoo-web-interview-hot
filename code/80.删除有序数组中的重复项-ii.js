/*
 * @lc app=leetcode.cn id=80 lang=javascript
 *
 * [80] 删除有序数组中的重复项 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
	let slow = 0,
		fast = 0;
	while (fast < nums.length) {
		//slow < 2 不必多说，还没开始真正的扫描，为什么不直接设0？
		// -> 前面初始化 0 看着爽
		// nums[fast] === nums[slow - 2] 意味着有出现了三个一样的，
		// -> slow 就不动，表示现在位置需要被换掉，留着后面有不一样的来换掉
		if (slow < 2 || nums[fast] != nums[slow - 2]) {
			nums[slow] = nums[fast]; //新元素来了，换！
			slow++;
		}
		fast++;
	}
	return slow;
};
// @lc code=end
