/*
 * @lc app=leetcode.cn id=870 lang=javascript
 *
 * [870] 优势洗牌
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var advantageCount = function (nums1, nums2) {
	const n = nums1.length;
	const idx = new Array(n); //num2索引数组
	for (let i = 0; i < n; i++) idx[i] = i;
	nums1.sort((a, b) => a - b);
	idx.sort((i, j) => nums2[i] - nums2[j]); //num2索引排序
	let l = 0,
		r = n - 1;
	//从小到大拿 num1
	for (let v of nums1) {
		if (v > nums2[idx[l]]) nums2[idx[l++]] = v;
		//小于的情况就直接开摆，拿去和 num2 最大的比（田忌赛马）
		else nums2[idx[r--]] = v;
	}
	return nums2;
};
// @lc code=end
