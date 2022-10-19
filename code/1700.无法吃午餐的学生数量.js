/*
 * @lc app=leetcode.cn id=1700 lang=javascript
 *
 * [1700] 无法吃午餐的学生数量
 */

// @lc code=start
/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
var countStudents = function (students, sandwiches) {
	const need = new Array(2).fill(0); //两种三明治的需求
	for (const v of students) need[v]++;
	for (let i = 0; i < sandwiches.length; i++) {
		if (--need[sandwiches[i]] == -1) return sandwiches.length - i;
	}
	return 0;
};
// @lc code=end
