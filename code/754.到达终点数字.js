/*
 * @lc app=leetcode.cn id=754 lang=javascript
 *
 * [754] 到达终点数字
 */

// @lc code=start
/**
 * @param {number} target
 * @return {number}
 */
var reachNumber = function (target) {
	let res = 0,
		cnt = 0;
	target = Math.abs(target); //方便计算
	while (1) {
		cnt += ++res;
		if (cnt >= target && (cnt - target) % 2 === 0) return res;
	}
};
// @lc code=end
