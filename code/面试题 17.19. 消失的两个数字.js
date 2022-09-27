/**
 * @param {number[]} nums
 * @return {number[]}
 */
var missingTwo = function (nums) {
	let res = [],
		mxV = -1;
	const len = nums.length;
	for (let i = 0; i < len; i++) {
		let v = Math.abs(nums[i]);
		mxV = Math.max(mxV, v);
		nums[v - 1] = -(nums[v - 1] || 1);
	}
	for (let i = 0; i < nums.length; i++) {
		let v = nums[i] || 1;
		if (v > 0 || v === undefined) {
			res.push(i + 1);
		}
	}
	while (res.length < 2) res.push(++mxV);
	return res;
};
