/**
 * 计数排序
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
	const diff = 50000;
	const counts = Array(diff * 2 + 1).fill(0);
	const res = [];
	for (const num of nums) counts[num + diff]++;
	for (let i in counts) {
		while (counts[i]--) res.push(i - diff);
	}
	return res;
};

/**
 * 快速排序
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
	if (nums.length <= 1) return nums; //递归中止
	const pivotIdx = Math.floor(nums.length / 2);
	const pivot = nums.splice(pivotIdx, 1)[0];
	const left = [],
		right = [];
	for (const num of nums) {
		if (num < pivot) left.push(num);
		else right.push(num);
	}
	return sortArray(left).concat([pivot], sortArray(right));
};
