/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	//特例
	if (nums.length < 3) return [];
	const res = [];
	nums.sort((a, b) => a - b); //升序
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] > 0) break; //升序的数组，她大于0就不会后面的加上他能等于0了
		if (i > 0 && nums[i] === nums[i - 1]) continue; //一样就跳过，避免重复三元组
		//双指针
		let left = i + 1,
			right = nums.length - 1;
		while (left < right) {
			// 保证 i < left < right
			if (nums[left] + nums[right] + nums[i] === 0) {
				//找到合适的
				res.push([nums[i], nums[left], nums[right]]);
				//跳过重复的
				while (nums[left] === nums[left + 1]) left++;
				left++;
				while (nums[right] === nums[right + 1]) right--;
				right--;
				// 不符合的根据情况调整
			} else if (nums[left] + nums[right] + nums[i] > 0) {
				right--;
			} else left++;
		}
	}
	return res;
};
