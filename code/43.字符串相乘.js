/*
 * @lc app=leetcode.cn id=43 lang=javascript
 *
 * [43] 字符串相乘
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
	if (num1 === '0' || num2 === '0') return '0';
	let l1 = num1.length,
		l2 = num2.length,
		res = new Array(l1 + l2).fill(0);
	for (let i = l1 - 1; i >= 0; i--) {
		for (let j = l2 - 1; j >= 0; j--) {
			const mul = num1[i] * num2[j];
			const up = i + j,
				cur = i + j + 1;
			const sum = mul + res[cur],
				carry = Math.floor(sum / 10);
			res[cur] = sum % 10;
			res[up] += carry;
		}
	}
	while (res[0] === 0) res.shift();
	return res.join('');
};
// @lc code=end
