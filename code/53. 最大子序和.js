/**dp
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	const len = nums.length;
	let mx = nums[0];
	for (let i = 1; i < len; i++) {
		nums[i] = Math.max(0, nums[i - 1]) + nums[i];
		if (nums[i] > mx) mx = nums[i];
	}
	return mx;
};
/**前缀和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	const len = nums.length;
	let mx = nums[0],
		mn = 0,
		sum = 0;
	for (let i = 0; i < len; i++) {
		sum += nums[i];
		if (sum - mn > mx) mx = sum - mn;
		if (sum < mn) mn = sum;
	}
	return mx;
};
