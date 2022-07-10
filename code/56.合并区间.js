/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
function isIntersect(a, b) {
	if (a[0] > b[1] || a[1] < b[0]) return false;
	return true;
}
function merge2(a, b) {
	return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
	intervals.sort((a, b) => a[0] - b[0]);
	for (let i = 0; i < intervals.length - 1; i++) {
		const cur = intervals[i],
			nxt = intervals[i + 1];
		if (isIntersect(cur, nxt)) {
			intervals[i] = undefined;
			intervals[i + 1] = merge2(cur, nxt);
		}
	}
	return intervals.filter(a => a);
};
// @lc code=end
