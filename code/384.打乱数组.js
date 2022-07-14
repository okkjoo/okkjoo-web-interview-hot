/*
 * @lc app=leetcode.cn id=384 lang=javascript
 *
 * [384] 打乱数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
	this.nums = nums;
	this.original = [...nums];
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function () {
	this.nums = [...this.original];
	return this.nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
	function swap(arr, i, j) {
		const c = arr[j];
		(arr[j] = arr[i]), (arr[i] = c);
	}
	for (let i = 0; i < this.nums.length; i++) {
		const j = i + Math.floor(Math.random() * (this.nums.length - i));
		swap(this.nums, i, j);
	}
	return this.nums;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
// @lc code=end
