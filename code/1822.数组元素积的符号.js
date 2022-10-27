/*
 * @lc app=leetcode.cn id=1822 lang=javascript
 *
 * [1822] 数组元素积的符号
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var arraySign = function (nums) {
	let cnt = 0;
	for (const num of nums) {
		if (num === 0) return 0;
		if (num < 0) cnt++;
	}
	return cnt % 2 === 0 ? 1 : -1;
};
// @lc code=end
