/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
	let cnt = 0;
	const rows = grid.length,
		cols = grid[0]?.length;
	if (rows === 0) return 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (grid[i][j] === "1") {
				dfs(grid, i, j);
				cnt++;
			}
		}
	}
	return cnt;
};
const dfs = (grid, i, j) => {
	const rows = grid.length,
		cols = grid[0].length;
	if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1 || grid[i][j] == "0")
		return;
	grid[i][j] = "0";
	const d = [
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1],
	];
	for (let k = 0; k < 4; k++) dfs(grid, i + d[k][0], j + d[k][1]);
};
// @lc code=end
