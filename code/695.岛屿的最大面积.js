/*
 * @lc app=leetcode.cn id=695 lang=javascript
 *
 * [695] 岛屿的最大面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
	const d = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	];
	const m = grid.length,
		n = grid[0].length;
	const dfs = (x, y) => {
		if (x < 0 || y < 0 || x >= m || y >= n || grid[x][y] === 0) return 0;
		grid[x][y] = 0;
		let cnt = 1; //这里从1开始而不是从0..
		for (let i = 0; i < 4; i++) cnt += dfs(x + d[i][0], y + d[i][1]);
		return cnt;
	};
	let res = 0;
	for (let i = 0; i < m; i++)
		for (let j = 0; j < n; j++) {
			res = Math.max(res, dfs(i, j));
		}
	return res;
};
// @lc code=end
