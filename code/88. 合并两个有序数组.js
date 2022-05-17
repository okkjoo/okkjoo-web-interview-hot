/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
	let cur = m + n - 1; //从nums1尾部开始
	while (cur >= 0) {
		if (n === 0) return; //num2已经全部放入num1中了
		if (m < 1) {
			//num1指针先走完了
			nums1[cur--] = nums2[--n];
			continue;
		}
		if (n < 1) {
			//num2指针先走完了
			nums1[cur--] = nums1[--m];
			continue;
		}
		//取较大的插入 nums1 的末尾、更新对应的指针
		if (nums1[m - 1] > nums2[n - 1]) {
			nums1[cur--] = nums1[--m];
		} else {
			nums1[cur--] = nums2[--n];
		}
	}
};
