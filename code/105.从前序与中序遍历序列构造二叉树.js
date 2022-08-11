/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
	if (preorder.length === 0) return null;
	let tmp = preorder[0];
	let sz = inorder.indexOf(tmp); //左侧部分的长度
	let root = new TreeNode(tmp);
	root.left = buildTree(preorder.slice(1, sz + 1), inorder.slice(0, sz));
	root.right = buildTree(preorder.slice(sz + 1), inorder.slice(sz + 1));
	return root;
};
// @lc code=end
