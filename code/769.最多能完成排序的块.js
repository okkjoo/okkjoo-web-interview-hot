/*
 * @lc app=leetcode.cn id=769 lang=javascript
 *
 * [769] 最多能完成排序的块
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function (arr) {
	let mx = 0,
		res = 0;
	for (let i = 0; i < arr.length; i++) {
		const cur = arr[i];
		mx = Math.max(mx, cur);
		if (mx === i) res++;
	}
	return res;
};
// @lc code=end
