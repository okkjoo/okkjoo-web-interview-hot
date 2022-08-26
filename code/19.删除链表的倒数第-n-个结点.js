/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
	let dummy = new ListNode(0, head);
	let slow = dummy,
		fast = head;
	while (n--) fast = fast.next;
	// console.log(fast);
	while (fast) {
		fast = fast.next;
		slow = slow.next;
	}
	slow.next = slow.next.next;
	return dummy.next;
};
// @lc code=end
