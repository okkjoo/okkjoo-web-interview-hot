/*
 * @lc app=leetcode.cn id=71 lang=javascript
 *
 * [71] 简化路径
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
	const names = path.split('/');
	const stk = [];
	for (const name of names) {
		if (name === '..') stk.length && stk.pop();
		else if (name.length && name !== '.') stk.push(name);
	}
	return `/${stk.join('/')}`;
};
// @lc code=end
