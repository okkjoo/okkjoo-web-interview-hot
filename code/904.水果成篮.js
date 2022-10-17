/*
 * @lc app=leetcode.cn id=904 lang=javascript
 *
 * [904] 水果成篮
 */

// @lc code=start
/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
	const len = fruits.length;
	let res = 0;
	const mp = new Map();
	for (let i = 0, l = 0; i < len; i++) {
		const v = fruits[i];
		mp.set(v, mp.get(v) ? mp.get(v) + 1 : 1);
		while (mp.size > 2) {
			const q = fruits[l++];
			mp.set(q, mp.get(q) - 1);
			if (mp.get(q) === 0) mp.delete(q);
		}
		res = Math.max(res, i - l + 1);
	}
	return res;
};
// @lc code=end
