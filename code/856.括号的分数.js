/*
 * @lc app=leetcode.cn id=856 lang=javascript
 *
 * [856] 括号的分数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function (s) {
	const stk = [];
	let res = 0;
	for (let i = 0; i < s.length; i++) {
		const c = s[i];
		if (c === '(') {
			stk.push(c);
		} else if (c === ')') {
			stk.pop();
			if (s[i - 1] === '(') res += 1 << stk.length;
		}
	}
	return res;
};
// @lc code=end
