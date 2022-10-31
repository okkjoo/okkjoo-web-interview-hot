/*
 * @lc app=leetcode.cn id=481 lang=javascript
 *
 * [481] 神奇字符串
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var magicalString = function (n) {
	const s = [1, 2, 2];
	for (let i = 2; s.length < n; i++) {
		const last = s[s.length - 1];
		for (let j = 0; j < s[i]; j++) {
			s.push(last ^ 3);
		}
	}
	return s.slice(0, n).filter(x => x === 1).length;
};
// @lc code=end
