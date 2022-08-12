/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
	/* 哈希法
	const st = new Set();
	while (headA !== null) {
		st.add(headA);
		headA = headA.next;
	}
	while (headB !== null) {
		if (st.has(headB)) return headB;
		headB = headB.next;
	}
	return null;
	 */

	/* 双指针法 */
	let a = headA,
		b = headB;
	while (a !== b) {
		a = a === null ? headB : a.next;
		b = b === null ? headA : b.next;
	}
	return b;
};
// @lc code=end
