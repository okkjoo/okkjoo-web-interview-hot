/*
 * @lc app=leetcode.cn id=1790 lang=javascript
 *
 * [1790] 仅执行一次字符串交换能否使两个字符串相等
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var areAlmostEqual = function (s1, s2) {
	let t1,
		t2,
		flag = 0;
	const l1 = s1.length,
		l2 = s2.length;
	if (l1 !== l2) return false;
	if (s1 === s2) return true;
	for (let i = 0; i < l1; i++) {
		if (s1[i] !== s2[i]) {
			flag++;
			if (flag === 1) t1 = i;
			if (flag === 2) t2 = i;
			if (flag === 3) return false;
		}
	}
	if (s2[t1] === s1[t2] && s2[t2] === s1[t1]) return true;
	return false;
};
// @lc code=end
