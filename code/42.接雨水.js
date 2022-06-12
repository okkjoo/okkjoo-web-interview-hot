/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
/* var trap = function (height) {
	let ans = 0;
	const leftMax = [],
		rightMax = [];
	let tmx = 0; //临时记录当前最高柱子
	for (let i = 0; i < height.length; i++) {
		leftMax[i] = tmx = Math.max(tmx, height[i]);
	}
	tmx = 0;
	for (let i = height.length - 1; i >= 0; i--) {
		rightMax[i] = tmx = Math.max(tmx, height[i]);
	}
	for (let i = 0; i < height.length; i++) {
		ans += Math.min(leftMax[i], rightMax[i]) - height[i];
	}
	return ans;
}; */
var trap = function (height) {
	let ans = 0,
		i = 0,
		j = height.length - 1,
		ileftMax = 0,
		jrightMax = 0;
	while (i < j) {
		ileftMax = Math.max(ileftMax, height[i]);
		jrightMax = Math.max(jrightMax, height[j]);
		if (height[i] < height[j]) {
			ans += ileftMax - height[i];
			i++;
		} else {
			ans += jrightMax - height[j];
			j--;
		}
	}
	return ans;
};
// @lc code=end
