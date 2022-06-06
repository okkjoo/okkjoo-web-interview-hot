/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *  因为插件没有剑指offer的
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
	let a = 0,
		b = 1,
		c = 0;
	for (let i = 0; i < n; i++) {
		c = (a + b) % 1000000007;
		a = b;
		b = c;
	}
	return a;
};
// @lc code=end
