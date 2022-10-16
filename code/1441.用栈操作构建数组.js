/*
 * @lc app=leetcode.cn id=1441 lang=javascript
 *
 * [1441] 用栈操作构建数组
 */

// @lc code=start
/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
var buildArray = function (target, n) {
	const ss = [],
		len = target.length;
	let cnt = 0,
		t = 0;
	for (let i = 1; i <= n; i++) {
		ss.push('Push');
		if (target[t] === i) {
			cnt++;
			t++;
		} else {
			ss.push('Pop');
		}
		if (cnt === len) break;
	}
	return ss;
};
// @lc code=end
