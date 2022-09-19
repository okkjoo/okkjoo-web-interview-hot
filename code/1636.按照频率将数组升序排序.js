/*
 * @lc app=leetcode.cn id=1636 lang=javascript
 *
 * [1636] 按照频率将数组升序排序
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function (nums) {
	const count = new Map();
	nums.forEach(num => void (count[num] = count[num] + 1 || 1));
	nums.sort((a, b) => {
		if (count[a] === count[b]) return b - a;
		return count[a] - count[b];
	});
	return nums;
};
// @lc code=end
