/*
 * @lc app=leetcode.cn id=1161 lang=javascript
 *
 * [1161] 最大层内元素和
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
var maxLevelSum = function (root) {
	let mxSum = -9999999,
		ans,
		depth = 1;
	const q = [root];
	while (q.length > 0) {
		let tSum = 0;
		let sz = q.length;
		while (sz--) {
			const t = q.shift();
			if (t.left) q.push(t.left);
			if (t.right) q.push(t.right);
			tSum += t.val;
		}
		if (tSum > mxSum) {
			mxSum = tSum;
			ans = depth;
		}
		depth++;
	}
	return ans;
};
// @lc code=end
