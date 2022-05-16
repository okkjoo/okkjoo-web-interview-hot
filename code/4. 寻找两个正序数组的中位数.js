/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
	//对数组长度较短的那个进行二分查找操作
	nums1.length > nums2.length && ([nums1, nums2] = [nums2, nums1]);
	const m = nums1.length,
		n = nums2.length;
	let low = 0,
		high = m;
	//二分
	while (low <= high) {
		const i = low + Math.floor((high - low) / 2), //i:数组A中 minRightA 的下标
			j = Math.floor((m + n + 1) / 2) - i; //j:数组B中 minRightB 的下标
		//这里注意特判，在边界的时候为了满足下面的条件，left的就是负无穷，right那头就是正无穷
		const maxLeftA = i === 0 ? -Infinity : nums1[i - 1],
			minRightA = i === m ? Infinity : nums1[i];
		const maxLeftB = j === 0 ? -Infinity : nums2[j - 1],
			minRightB = j === n ? Infinity : nums2[j];
		//进行判断
		if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
			return (m + n) & 1 //m+n 的奇偶情况分量讨论
				? Math.max(maxLeftA, maxLeftB)
				: (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
		} //不满足的话就要根据情况调整 low / high 指针
		else if (maxLeftA > minRightB) {
			high = i - 1;
		} else {
			low = low + 1;
		}
	}
};
