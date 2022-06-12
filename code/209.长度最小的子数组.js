/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
	if (nums.length === 0) return 0;
	let left = 0,
		right = 0,
		len = 0;
	let cnt = 0,
		ans = 0;
	for (; right < nums.length + 1; right++) {
		//注意这里 right 要跑到 length，不然最后一步会不收缩左边界
		while (cnt >= target) {
			if (ans === 0 || len < ans) {
				ans = len;
			}
			cnt -= nums[left++];
			len--;
		}
		len++;
		cnt += nums[right];
	}
	return ans;
};
// @lc code=end
