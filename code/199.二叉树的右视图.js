/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
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
var rightSideView = function (root) {
	if (!root) return [];
	const q = [root];
	const res = [];
	while (q.length) {
		let len = q.length;
		while (len--) {
			const x = q.shift();
			if (len === 0) res.push(x.val);
			x.left && q.push(x.left);
			x.right && q.push(x.right);
		}
	}
	return res;
};
// @lc code=end
