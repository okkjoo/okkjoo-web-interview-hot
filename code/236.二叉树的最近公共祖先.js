/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
	let ans;
	const dfs = (root, p, q) => {
		if (root === null) return false;
		const lson = dfs(root.left, p, q),
			rson = dfs(root.right, p, q);
		if (
			(rson && lson) ||
			((root.val === p.val || root.val === q.val) && (rson || lson))
		) {
			ans = root;
		}
		return lson || rson || root.val === q.val || root.val === p.val;
	};
	dfs(root, p, q);
	return ans;
};
// @lc code=end
