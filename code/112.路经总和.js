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
 * @param {number} targetSum
 * @return {boolean}
 */
// var hasPathSum = function(root, targetSum) {
//     const traversal = (node, cnt) =>{
//         if(cnt === 0 && !node.left && !node.right) return true // 找到符合题意的叶子节点
//         if(!node.left && !node.right) return false //不合适的叶子节点就直接返回
//         // 往左右子节点找(如果子节点不为空的话)
//         if(node.left && traversal(node.left, cnt - node.left.val)) return true
//         if(node.right && traversal(node.right, cnt - node.right.val)) return true
//         return false //都没找到合适的就 false
//     }
//     if(!root) return false //空树
//     return traversal(root, targetSum - root.val)
// };
//将上面的 traversal 融合进来，简化代码
var hasPathSum = function (root, targetSum) {
	if (!root) return false;
	if (!root.left && !root.right && targetSum === root.val) return true;
	return (
		hasPathSum(root.left, targetSum - root.val) ||
		hasPathSum(root.right, targetSum - root.val)
	);
};
