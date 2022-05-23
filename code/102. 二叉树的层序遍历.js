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
var levelOrder = function (root) {
	if (!root) return [];
	const res = [],
		que = [root, null];
	let tmpLevel = [];
	while (que.length) {
		const t = que.shift();
		if (t) {
			tmpLevel.push(t.val);
			t.left && que.push(t.left);
			t.right && que.push(t.right);
		} else {
			// t为null
			res.push(tmpLevel);
			// tmpLevel.length = 0
			// tmpLevel.splice(0,tmpLevel.length)
			tmpLevel = [];
			que.length && que.push(null); //注意这里
		}
	}
	return res;
};
