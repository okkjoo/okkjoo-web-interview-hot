/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
	if (!head || !head.next) return head;
	let cur = head,
		pre = null,
		nxt;
	while (cur != null) {
		nxt = cur.next;
		cur.next = pre;
		pre = cur;
		cur = nxt;
	}
	return pre;
};
