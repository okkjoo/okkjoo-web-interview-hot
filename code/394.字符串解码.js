/*
 * @lc app=leetcode.cn id=394 lang=javascript
 *
 * [394] 字符串解码
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
	let stk = [],
		res = '',
		mult = 0;
	for (let c of s) {
		if (c === '[') {
			stk.push([mult, res]);
			[mult, res] = [0, ''];
		} else if (c === ']') {
			const [tmult, lastStr] = stk.pop();
			res = lastStr + res.repeat(tmult);
		} else if (!isNaN(c)) {
			mult = mult * 10 + parseInt(c); //注意这里要×10
		} else res += c;
	}
	return res;
};
// @lc code=end
