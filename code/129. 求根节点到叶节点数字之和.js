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
var sumNumbers = function (root) {
	return dfs(root, 0);
};
const dfs = (node, cur) => {
	if (node === null) return 0;
	const v = node.val + cur * 10;
	if (node.left === null && node.right === null) return v;
	return dfs(node.left, v) + dfs(node.right, v);
};
