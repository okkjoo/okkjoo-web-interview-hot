/*
 * @lc app=leetcode.cn id=1235 lang=javascript
 *
 * [1235] 规划兼职工作
 */

// @lc code=start
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function (startTime, endTime, profit) {
	const n = startTime.length;
	const dp = new Array(n + 1).fill(0);
	const jobs = new Array(n)
		.fill(0)
		.map((_, i) => [startTime[i], endTime[i], profit[i]]);
	jobs.sort((a, b) => a[1] - b[1]);
	for (let i = 1; i <= n; i++) {
		let l = 0,
			r = i - 1;
		while (l < r) {
			const mid = l + Math.floor((r - l) >> 1);
			if (jobs[mid][1] <= jobs[i - 1][0]) l = mid + 1;
			else r = mid;
		}
		dp[i] = Math.max(dp[i - 1], dp[l] + jobs[i - 1][2]);
	}
	return dp[n];
};
// @lc code=end
