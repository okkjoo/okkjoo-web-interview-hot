/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
/* 递归
var kthLargest = function (root, k) {
	let res;
	const dfs = root => {
		if (!root) return;
		dfs(root.right); //右
		if (k === 0) return;
		//中
		if (--k === 0) {
			res = root.val;
			return;
		}
		dfs(root.left); //左
	};
	dfs(root);
	return res;
};
*/
// 迭代，就是用栈来模拟递归
var kthLargest = function (root, k) {
	const stk = [];
	while (root !== null || stk.length) {
		while (root !== null) {
			stk.push(root); //存中
			root = stk.right; //取右
		}
		root = root.pop(); //取中
		if (--k === 0) break;
		root = root.left; //取左
	}
	return root.val;
};
