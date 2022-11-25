> `okkjoo-leetcodeHot-byJs`带你刷高频面试题~
> 合集仓库：[okkjoo-leetcodeHot-byJs](https://github.com/okkjoo/okkjoo-leetcodeHot-byJs)
> 这里专门放剑指 offer 里面的题目
> 为什么这么特殊？主要是它太常考了~ (其实是因为 vscode leetcode 插件里没有里面的题目，之前没怎么做)
> 使用说明：CTRL+F 搜题目名字或题号即可

## 剑指 Offer 22. 链表中倒数第 k 个节点|简单|双指针

### 题目描述

```
输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。
```

### 解题思路

经典快慢指针，k 个 k 个，快指针先走 k 步后慢指针开始走即可。快指针到结尾时，慢指针就到了倒数第 k 个

### 代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
	let fast = head,
		slow = head;
	while (k--) {
		fast = fast.next;
	}
	while (fast) {
		fast = fast.next;
		slow = slow.next;
	}
	return slow;
};
```

## 剑指 Offer 54. 二叉搜索树的第 k 大节点|简单

### 题目描述

```js
给定一棵二叉搜索树，请找出其中第 k 大的节点的值。
```

### 解题思路

其实这题和 230.二叉搜索树中的第 k 小的元素 有点像，就是一个求小一个求大

首先必要知道的前提基础知识就是，二叉搜索树上的任意一个点，它的左子树上的所有点都比它本身小，右子树则大。

那么中序遍历（中序遍历就是左中右）的结果，自然就是二叉树上结点的升序排序 —— 方便求第 k 小的数

那反过来的中序遍历（右中左）自然就是二叉树的降序排序 —— 方便求第 k 大的数

那么具体的方法就分为两种

1. 递归
2. 迭代

详细看代码吧，很简单

### 代码

递归

```js
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
```

迭代

```js
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
var kthLargest = function (root, k) {
	const stk = [];
	while (root !== null || stk.length) {
		while (root !== null) {
			stk.push(root); //存中
			root = root.right; //取右
		}
		root = stk.pop(); //取中
		if (--k === 0) break;
		root = root.left; //取左
	}
	return root.val;
};
```
