/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
	/* 
	if (!root) return [];
	return [root.val]
		.concat(preorderTraversal(root.left))
		.concat(preorderTraversal(root.right));
  */
	if (!root) return [];
	const ans = [],
		stk = [root];
	let t = stk.pop();
	while (t) {
		if (t.right) {
			stk.push(t.right);
		}
		if (t.left) {
			stk.push(t.left);
		}
		ans.push(t.val);
		t = stk.pop();
	}
	return ans;
};
// @lc code=end
