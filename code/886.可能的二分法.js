/*
 * @lc app=leetcode.cn id=886 lang=javascript
 *
 * [886] 可能的二分法
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (n, dislikes) {
	const fa = new Array(n + 1).fill(0); //并查集
	for (let i = 0; i <= n; i++) fa[i] = i;
	const find = x => (x === fa[x] ? x : (fa[x] = find(fa[x])));
	const merge = (i, j) => {
		const x = find(i),
			y = find(j);
		fa[x] = y;
	};
	const isOne = (i, j) => find(i) === find(j);
	const g = new Array(n + 1).fill(0).map(() => new Array()); //每个人讨厌的所有人的表
	for (const e of dislikes) {
		g[e[0]].push(e[1]);
		g[e[1]].push(e[0]);
	}
	for (let i = 1; i <= n; i++) {
		for (const j of g[i]) {
			if (isOne(i, j)) return false;
			merge(j, g[i][0]); //把 i 讨厌的人都分在一组
		}
	}
	return true;
};
// @lc code=end
