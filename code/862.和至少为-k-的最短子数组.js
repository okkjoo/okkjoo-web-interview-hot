/*
 * @lc app=leetcode.cn id=862 lang=javascript
 *
 * [862] 和至少为 K 的最短子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
	const n = nums.length;
	let ans = n + 1;
	const s = new Array(n + 1); //前缀和
	s[0] = 0;
	for (let i = 0; i < n; i++) {
		s[i + 1] = s[i] + nums[i];
	}
	const q = []; //可以做区间左边界的下标的双端队列
	for (let i = 0; i <= n; i++) {
		//i就是区间的右边界
		const curs = s[i];
		while (q.length && curs - s[q[0]] >= k) {
			ans = Math.min(ans, i - q[0]);
			q.shift();
		}
		while (q.length && s[q[q.length - 1]] >= curs) {
			q.pop();
		}
		q.push(i);
	}
	return ans > n ? -1 : ans;
};
// @lc code=end
