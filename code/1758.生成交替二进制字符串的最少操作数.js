/*
 * @lc app=leetcode.cn id=1758 lang=javascript
 *
 * [1758] 生成交替二进制字符串的最少操作数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function (s) {
	let cnt1 = 0,
		cnt2 = 0;
	for (let i = 0; i < s.length; i++) {
		if (i & 1) s[i] === '0' ? cnt1++ : cnt2++;
		else s[i] === '1' ? cnt1++ : cnt2++;
	}
	return Math.min(cnt1, cnt2);
};
// @lc code=end
