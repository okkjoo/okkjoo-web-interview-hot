/*
 * @lc app=leetcode.cn id=934 lang=javascript
 *
 * [934] 最短的桥
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function (grid) {
	const d = [-1, 0, 1, 0, -1];
	const n = grid.length;
	const que = [];
	const dfs = (x, y) => {
		if (x < 0 || y < 0 || x >= n || y >= n || grid[x][y] !== 1) return;
		que.push([x, y]);
		grid[x][y] = 11; //标记为岛1的点，剩下为1的都是岛2 的点
		for (let di = 0; di < 4; di++) dfs(x + d[di], y + d[di + 1]);
	};
	for (let i = 0; i < n; i++) {
		let breakFlag = false;
		for (let j = 0; j < n; j++) {
			if (grid[i][j] === 1) {
				dfs(i, j);
				breakFlag = true;
				break;
			}
		}
		if (breakFlag) break;
	}
	let step = 0;
	//BFS
	while (que.len !== 0) {
		const sz = que.length;
		for (let k = 0; k < sz; k++) {
			const cur = que.shift(); //从队列头部取才保证是在岛1的外层
			for (let l = 0; l < 4; l++) {
				const dx = cur[0] + d[l];
				const dy = cur[1] + d[l + 1];
				if (dx >= 0 && dy >= 0 && dx < n && dy < n) {
					if (grid[dx][dy] === 0) {
						//是海就是边缘，加入队列用于下一次
						que.push([dx, dy]);
						grid[dx][dy] = 2; //标记为访问过
					} else if (grid[dx][dy] === 1)
						//遇到 岛2 的点了
						return step;
				}
			}
		}
		step++;
	}
	return 0; //其实题目确保有路的话是不会走到这里的
};
// @lc code=end
