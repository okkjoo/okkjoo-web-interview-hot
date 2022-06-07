/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 * DFS
 * @param {TreeNode} root
 * @return {number}
 */
// var maxDepth = function (root) {
// 	if (!root) return 0;
// 	if (!root.left && !root.right) return 1;
// 	return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
// };
/**
 * BFS
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
	if (!root) return 0;
	if (!root.right && !root.left) return 1;
	let cur = root;
	const que = [root, null];
	let level = 1;
	while ((cur = que.shift()) !== undefined) {
		if (cur === null) {
			if (que.length === 0) return level;
			level++;
			que.push(null);
			continue;
		}
		cur.left && que.push(cur.left);
		cur.right && que.push(cur.right);
	}
};
// @lc code=end
