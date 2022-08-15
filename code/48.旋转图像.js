/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
	const n = matrix.length;
	//*
	for (let i = 0; i < Math.floor(n / 2); i++) {
		for (let j = 0; j < n; j++) {
			[matrix[i][j], matrix[n - i - 1][j]] = [
				matrix[n - i - 1][j],
				matrix[i][j],
			];
		}
	}

	for (let i = 0; i < n; i++) {
		//*
		for (let j = 0; j < i; j++) {
			[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
		}
	}
};
// @lc code=end
