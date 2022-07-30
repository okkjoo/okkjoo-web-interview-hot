/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
	if (!root) return [];
	const ans = []; //最终结果
	let dFlag = true; //遍历方向
	let levelNodes = []; //存储某一层
	const que = [root, null]; //用于 BFS
	while (que.length > 0) {
		const t = que.shift();
		if (t) {
			levelNodes.push(t.val);
			if (t.left) {
				que.push(t.left);
			}
			if (t.right) {
				que.push(t.right);
			}
		} else {
			if (!dFlag) {
				levelNodes = levelNodes.reverse();
			}
			ans.push(levelNodes);
			levelNodes = [];
			dFlag = !dFlag;
			if (que.length > 0) {
				que.push(null);
			}
		}
	}
	return ans;
};
// @lc code=end
