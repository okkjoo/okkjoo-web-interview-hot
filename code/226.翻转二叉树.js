/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
	if (!root) return root;
	/* const left = root.left,
		right = root.right;
	root.left = invertTree(right);
	root.right = invertTree(left);
	return root; */
	const stk = [root];
	let cur;
	while ((cur = stk.shift())) {
		const left = cur.left,
			right = cur.right;
		cur.left = right;
		cur.right = left;
		left && stk.push(left);
		right && stk.push(right);
	}
	return root;
};
// @lc code=end
