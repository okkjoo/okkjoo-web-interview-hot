/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
	const stk = [];
	while (root != null || stk.length) {
		while (root != null) {
			stk.push(root); //先把中存起来
			root = root.left; //取左
		}
		root = stk.pop(); //取中
		if (--k === 0) break;
		root = root.right; //取右
	}
	return root.val;
};
// @lc code=end
