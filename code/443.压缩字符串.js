/*
 * @lc app=leetcode.cn id=443 lang=javascript
 *
 * [443] 压缩字符串
 */

// @lc code=start
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
	let write = 0,
		read,
		tcnt = 1; //注意这里从1开始
	for (read = 0; read < chars.length; read++) {
		if (read === chars.length - 1 || chars[read] !== chars[read + 1]) {
			chars[write++] = chars[read];
			if (tcnt > 1) {
				tcnt = tcnt + '';
				for (let s of tcnt) {
					chars[write++] = s;
				}
			}
			tcnt = 0;
		}
		tcnt++;
	}
	return write;
};
// @lc code=end
