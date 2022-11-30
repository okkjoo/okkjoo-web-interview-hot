> `okkjoo-leetcodeHot-byJs`带你刷高频面试题~
> 合集仓库：[okkjoo-leetcodeHot-byJs](https://github.com/okkjoo/okkjoo-leetcodeHot-byJs)
> 这里专门放剑指 offer 里面的题目
> 为什么这么特殊？主要是它太常考了~ (其实是因为 vscode leetcode 插件里没有里面的题目，之前没怎么做)
> 使用说明：CTRL+F 搜题目名字或题号即可

## 剑指 Offer 09. 用两个栈实现队列|简单|栈|队列

### 题目描述

```
用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

```

### 解题思路

简单的考察一下数据结构中栈和队列的性质

- 栈：先进后出，后进先出
- 队列：先进先出，后进后出

要想用栈来模拟队列，那一个栈肯定不行，那就拿两个 —— 一个插入栈、一个删除栈

插入直接插入插入栈即可，删除时检查删除栈有没有数据，没有的话就把插入栈中的依次拿出，依次放入删除栈 —— 顺序就对了

然后简单判断一下队列为空的情况即可

### 代码

```js
var CQueue = function () {
	this.stkA = [];
	this.stkD = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
	this.stkA.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
	if (this.stkD.length) return this.stkD.pop();
	else {
		while (this.stkA.length) this.stkD.push(this.stkA.pop());
		if (!this.stkD.length) return -1;
		else return this.stkD.pop();
	}
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```

## [剑指 Offer 10- I. 斐波那契数列](https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/)|简单|记忆化搜索|动态规划

### 题目描述

```
写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
```

### 解题思路

如果你直接暴力递归就会超时，你可以选择记忆递归、动态规划、矩阵快速幂

这里只讲动态规划

其实就是 转换方程为 `F(N) = F(N - 1) + F(N - 2)` 的动态规划

然后发现也只需要几个变量即可，不需要另外创建 DP 数组

### 代码

```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
	let a = 0,
		b = 1,
		c = 0;
	for (let i = 0; i < n; i++) {
		c = (a + b) % 1000000007;
		a = b;
		b = c;
	}
	return a;
};
```



## [剑指 Offer 10- II. 青蛙跳台阶问题](https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

### 题目描述

```
一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

```

### 解题思路

DP 入门题目

每一步可以 1 级也可以 2 级，说明到第 i 级阶梯可能是从上一个或者是上上一个

- `dp[i]` 表示到 第 i 个阶梯的跳法数

- 初始化`dp[0] = dp[1] = d[2] = 1`

- 状态转移 `dp[i] = dp[i - 1] + dp[i - 2]`

那答案就是 `dp[n]`

然后发现其实只需要保存最近的两个状态`dp[i-2]与dp[i-1]` —— 两个变量就可以了，把空间优化了

### 代码

```js
/**
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
	if (n <= 2) return n === 0 ? 1 : n;
	let a = 1,
		b = 2;
	for (let i = 3; i <= n; i++) {
		let t = a + b;
		a = b;
		b = t % 1000000007;
	}
	return b;
};
```

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

## [剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode.cn/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)|中等|二叉搜索树性质

### 题目描述

```
输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。
```

> 原题还有图示，看不太懂题目可以去看看

### 解题思路

> 双向循环链表:第一个节点的前驱是最后一个节点，最后一个节点的后继是第一个节点

注意一个关键限制：**要求不能创建任何新的节点，只能调整树中节点指针的指向。**

也就是就地完成操作，最后返回链表中第一个节点指针

然后就是有序了，首先二叉搜索树的属性就是某节点的左子树都小于它... 所以一个二叉搜索树的中序遍历（左中右）—— 写个 dfs 就好了，自然就是按照升序的顺序操作

关键操作就在左中右的那个中里面：

获取到中节点 root 之后

1. 上一个节点也就是中节点的左子节点的 right 要指向 root
2. root 的 left 自然要指回 上一个节点

所以 需要将上一个节点存储下来，并且在每次处理完的中节点就是下一次 dfs 的 上一个节点

另外就是最后一个节点要和第一个节点相连，所以还要存一下 head —— 整棵树最左边的那个

### 代码

```js
/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
	if (root === null) return null;
	let head = null,
		pre = null;
	const dfs = root => {
		if (root === null) return;
		// 左
		dfs(root.left);
		// 中
		if (pre === null) {
			// 第一次到中，pre 就还是 null，此时到了整棵树最左边
			head = root;
		} else {
			pre.right = root;
			root.left = pre;
		}
		pre = root;
		// 右
		dfs(root.right);
	};
	dfs(root);
	head.left = pre;
	pre.right = head;
	return head;
};
```

## [剑指 Offer 42. 连续子数组的最大和](https://leetcode.cn/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)|动态规划|前缀和

### 题目描述

```
输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。
```

### 解题思路1 动态规划

暴力双层循环的话时间复杂度就是O(n^2)

还得是动态规划

用 `dp[i]` 表示末尾下标为 i 的子序列中子数组和最大值

最终答案就是 `Max{dp[i],i∈[0,1,...,n-1]}` —— 每次循环中记录即可

状态转移方程：`dp[i] = max(dp[i], dp[i] + nums[i])`，因为`nums[i]`可能是负的

然后还能再优化一下空间，因为遍历过一次 nums 就不用了，所以可以直接拿 nums 当 dp 数组

### 代码1 动态规划

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let mx = nums[0]
    for(let i = 1; i < nums.length; i++){
        nums[i] = Math.max(nums[i], nums[i] + nums[i-1])
        if(nums[i] > mx) mx = nums[i]
    }
    return mx
};
```

### 解题思路2 前缀和

之前暴力效率慢的原因就是，每次查询一段子数组都会有重复的遍历

有没有什么办法可以让每次查询效率高一点呢？那就是前缀和预处理了

>  前缀和，一种降低查询操作复杂度的预处理手段，一句话概述的话就是这样：让`s[i]`记录下标从0到i的和，那么`[i, j]`的和就等于`s[j] - s[i-1]`

那么在这里该怎么结合在一起？

**当`i<j, s[i]`是`s[0],s[1],...s[j-1]`最小值的时候，`s[j]-s[i] = s[j] - min `就是以 j 为下标的子序列之和的最大值了** —— 常数 - B 最大的情况，就是 B 最小的情况，很好理解吧

我们这里只需要临时存储`s[i]` 就好了，所以直接用`sum` 变量就行，用 mn 存储最小的 `s[i]`，

> 时间复杂度为`O(n)`，空间复杂度为`O(1)`

### 代码2 前缀和

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let mx = nums[0], mn = 0, sum = 0
    for(let i = 0; i < nums.length; i++){
        sum += nums[i]
        if(sum - mn > mx) mx = sum - mn
        if(sum < mn) mn = sum
    }
    return mx
};
```





## [剑指 Offer 51. 数组中的逆序对](https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)|困难|分治思想|归并排序|树状数组

### 题目描述

```
在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
```

### 解题思路

乍一看，直接暴力？ 双层循环嗯找每个数有几个逆序对... 肯定不行，看着题目难度和测试数据范围就知道不行

一次写想不出来我觉得是很正常的，直接上提示吧

> 利用 **归并排序** 计算逆序对
>
> 主要通过归并排序中 **合**并两个数组 的这一步骤，借助有序关系，一次性计算出一个元素相关的逆序个数、

如果不知道为什么在合并步骤中可以拿到 —— 那就复习一下逆序吧，脑子里可视化一下那个过程~ 或者找一个归并排序图解，这里懒得画了

所以我们现需要 排序一下，方便后面通过有序关系，快速处理逆序对个数

水平有限，感觉一大段文字还是讲不明白，直接上代码＋注释吧

具体实现其实就是归并 + 关键地方的处理

> 还有一种树状数组的做法，这就比较专业了，我觉得不打竞赛什么的可以先不掌握

### 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
	let cnt = 0;
	if (nums.length < 2) return 0;
	const merge = (left, right) => {
		const tmp = [];
		let i = 0,
			j = 0;
		while (i < left.length && j < right.length) {
			if (left[i] <= right[j]) tmp.push(left[i++]); // 左小于右正常
			else {
				//* 关键就在这里：左大于右就会产生逆序对
				tmp.push(right[j++]);
				// 左右有序，左边当前元素以及之后的元素，都会和 right[j] 产生一个逆序对
				cnt += left.length - i;
			}
		}
		return [...tmp, ...left.slice(i), ...right.slice(j)];
	};
	const mergeSort = arr => {
		if (arr.length < 2) return arr;
		const mid = arr.length >> 1;
		const left = arr.splice(0, mid);
		return merge(mergeSort(left), mergeSort(arr));
	};
	mergeSort(nums);
	return cnt;
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
