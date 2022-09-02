/*
 * @lc app=leetcode.cn id=349 lang=javascript
 *
 * [349] 两个数组的交集
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
	const st1 = new Set(nums1);
	let res = [];
	for (let v of nums2) {
		if (st1.has(v)) res.push(v);
	}
	res = [...new Set(res)];
	return res;
};
// @lc code=end
