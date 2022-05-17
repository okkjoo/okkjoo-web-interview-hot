/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
	const mp = new Map();
	for (let i = 0; i < nums.length; i++) {
		const v = nums[i];
		const diff = target - v;
		if (mp.has(diff)) return [mp.get(diff), i];
		mp.set(v, i);
	}
};
