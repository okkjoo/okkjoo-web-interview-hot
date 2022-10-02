/*
 * @lc app=leetcode.cn id=777 lang=javascript
 *
 * [777] 在LR字符串中交换相邻字符
 */

// @lc code=start
/**
 * @param {string} start
 * @param {string} end
 * @return {boolean}
 */
var canTransform = function (start, end) {
	if (start.length !== end.length) return false;
	const n = start.length;
	let i = 0,
		j = 0;
	while (i < n && j < n) {
		while (i < n && start[i] === 'X') i++;
		while (j < n && end[j] === 'X') j++;
		// i j 都遇到了自己的墙
		if (i < n && j < n) {
			//两堵墙不一样就说明相对顺序不一样
			if (start[i] !== end[j]) return false;
			const c = start[i];
			//相对顺序一样，但是同一堵墙相对位置不合理
			if ((c === 'L' && i < j) || (c === 'R' && i > j)) return false;
			//继续往下走找下一堵墙
			i++, j++;
		}
	}
	//有一个字符串已经遍历完了，但是另一个后面还有墙也是 false
	while (i < n) {
		if (start[i] !== 'X') return false;
		i++;
	}
	while (j < n) {
		if (end[j] !== 'X') return false;
		j++;
	}
	return true;
};
// @lc code=end
