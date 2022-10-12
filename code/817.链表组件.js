/*
 * @lc app=leetcode.cn id=817 lang=javascript
 *
 * [817] 链表组件
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number[]} nums
 * @return {number}
 */
var numComponents = function (head, nums) {
	const set = new Set(nums);
	let cur = head,
		cnt = 0,
		flag = 0;
	while (cur !== null) {
		if (set.has(cur.val)) {
			flag = 1;
		} else if (flag === 1) {
			cnt++;
			flag = 0;
		}
		cur = cur.next;
	}
	if (flag === 1) cnt++;
	return cnt;
};
// @lc code=end
// numComponents((head = [0, 1, 2, 3, 4]), (nums = [0, 3, 1, 4]));
