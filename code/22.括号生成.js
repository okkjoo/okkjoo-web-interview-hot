/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
	const res = [];
	//l r s：左右括号个数、当前构造出的字符串
	const dfs = (l, r, s) => {
		if (l == n && r == n) return res.push(s);
		if (l < r) return;
		if (l < n) dfs(l + 1, r, s + "(");
		if (r < l) dfs(l, r + 1, s + ")");
	};
	dfs(0, 0, "");
	return res;
};
// @lc code=end
