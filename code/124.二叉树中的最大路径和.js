/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
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
 * @return {number}
 */
var maxPathSum = function (root) {
	if (root === null) return 0;
	let maxSum = -9999;
	const dfs = root => {
		if (root === null) return 0;
		const left = dfs(root.left),
			right = dfs(root.right);

		const subTreeSum = root.val + left + right;
		maxSum = Math.max(maxSum, subTreeSum);

		return root.val + Math.max(0, left, right) > 0
			? root.val + Math.max(0, left, right)
			: 0;
	};
	dfs(root);
	return maxSum;
};
// @lc code=end
