/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
	let fast = head,
		slow = head;
	while (k--) {
		fast = fast.next;
	}
	while (fast) {
		fast = fast.next;
		slow = slow.next;
	}
	return slow;
};
