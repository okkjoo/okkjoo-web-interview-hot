/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
	const len = getListLength(head);
	let count = Math.floor(len / k);
	let hair = new ListNode();
	hair.next = head;
	let pre = hair,
		cur = pre.next;
	while (count--) {
		reverse(pre, cur, k);
		// 每反转一组，要更新 pre 和 cur
		pre = cur;
		cur = cur.next;
	}
	return hair.next;
};
const getListLength = head => {
	let cur = head;
	let i = 0;
	while (cur) {
		cur = cur.next;
		i++;
	}
	return i;
};

const reverse = (pre, cur, k) => {
	//k个点，反转 k-1 次相邻两个节点
	while (--k) {
		// 反转相邻两个节点
		let nxt = cur.next;
		cur.next = nxt.next;
		nxt.next = pre.next;
		pre.next = nxt;
	}
};
// @lc code=end
