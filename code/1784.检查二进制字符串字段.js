/*
 * @lc app=leetcode.cn id=1784 lang=javascript
 *
 * [1784] 检查二进制字符串字段
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var checkOnesSegment = function (s) {
	let len = s.length,
		flag = 1;
	for (let i = 0; i < len; i++) {
		if (s[i] === '1' && flag) {
			flag = 0;
			while (s[i] === '1') i++;
		}
		if (s[i] === '1') return false;
	}
	return true;
};
// @lc code=end
