> 分类好了，刷完就好，也不多
> 实在不行，起码每一分类的前几项也要刷好

# 手写模块

## ES API

function

- [bind](./Handwriting/JS%20basics/bind.js)
- [call](./Handwriting/JS%20basics/call.js)
- [apply](./Handwriting/JS%20basics/apply.js)
- 用 setTimeout 实现 setInterval

array

- [快排 sort](./Handwriting/JS%20basics/quickSort.js)
- 数组去重
- [数组扁平化 flat](./Handwriting/JS%20basics/flatPro.ts)
- [Array.prototype.reduce](./Handwriting/JS%20basics/reduce.js)
- map
  - [reduce 版](<./Handwriting/JS%20basics/map(ES5).js>)
  - [ES5 版](<./Handwriting/JS%20basics/map(ES5).js>)
- [flatMap](./Handwriting/JS%20basics/flatMap.js)

string

- [String.prototype.trim](./Handwriting/JS%20basics/String.prototype.trim.ts)

object

- [new](./Handwriting/JS%20basics/new.js)
- [create](./Handwriting/JS%20basics/Obecjt.create.js)
- [instance](./Handwriting/JS%20basics/instanceof.js)
- [全部继承 inherit](./Handwriting/JS%20basics/inherit.js)
- [freeze](./Handwriting/JS%20basics/Object.freeze.js)

promise

- [Promise.all](./Handwriting/JS%20basics/promiseAll.js)
- [Promise.race](./Handwriting/JS%20basics/promiseRace.js)
- 并发限制的 Promise 调度
- [Promise](./Handwriting/JS%20basics/Promise.js)
- [asyncTogennerator](<./Handwriting/JS%20basics/async_await(asyncToGenerator).js>)

DOM

- [getAllTags](./Handwriting/JS%20basics/getAllTags.js)

## utils

常用工具函数集锦

function

- [throtle](./Handwriting/utils/throttle.js)
- [debounce](./Handwriting/utils/debounce.js)
- [compose](./Handwriting/utils/compose.ts)
- [once](./Handwriting/utils/once.ts)
- [delay](./Handwriting/utils/delay.ts)
- [sleep](./Handwriting/utils/sleep.ts)

object

- [shallowClone](./Handwriting/utils/shallowClone.js)
- [deepClone](./Handwriting/utils/deepClone.js)
  - [退阶版 deepClone](<./Handwriting/utils/deepClone(easy).js>)
- [deepEqual](./Handwriting/utils/deepEqual.js)
- get TODO

array

- [flatArrToJsonTree](./Handwriting/utils/flatArrToJSONTree.ts)
  - 树转数组
- [从数组中随机取出一项 sample](./Handwriting/utils/sample.ts)
- [shuffle](./Handwriting/utils/shuffle.ts)
- [maxBy](./Handwriting/utils/maxBy.ts)
- [keyBy](./Handwriting/utils/keyBy.ts)
- [groupBy](./Handwriting/utils/groupBy.ts)
- [chunk](./Handwriting/utils/chunk.ts)
- [取数组交集 intersection](./Handwriting/utils/intersection.ts)
- pickBy
- omitBy

正则

- [isUrl](./Handwriting/utils/isURL.ts)
- [getUrlParams](./Handwriting/utils/getUrlParams.js)

其他

- [getType](./Handwriting/utils/getType.ts)
- 版本号排序

## 实现 XXX

- [fetch 简单封装](./Handwriting/utils/fetchPro.js)
- [懒计算 lazySum](./Handwriting/utils/lazySum.js)
- [发布订阅模式](./Handwriting/operate/EvenEmitter.js)
- [观察者模式](./Handwriting/operate/Observer.js)
- 模板字符串解析功能
- 虚拟 DOM 转真实 DOM

# 数据结构与算法(leetcode)

关于算法这块，如果你之前已经系统刷过了，想复习一下的话，直接从 [每周题解](./%E6%AF%8F%E5%91%A8%E7%9A%84%E9%A2%98%E8%A7%A3/) 开始就好了，那里面是按频率排序的

如果是小白，还是先系统的学习一下比较好，推荐代码随想录，那里挺全面的，我这里主要是面试高频题然后再分了下类。
你要是不想刷他那里这么多或者时间比较赶，相信我也没啥问题~

> 每一题我都有写题解，你可以搜索一下题目名字，应该能在每周题解里找到
> 建议先打开力扣题库，搜索题目自己先做一下~

## 字符串

- [最长回文子串](./code/5.%20%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2.js)
- [最长公共前缀](./code/14.%E6%9C%80%E9%95%BF%E5%85%AC%E5%85%B1%E5%89%8D%E7%BC%80.js)
- [无重复字符的最长子串](./code/3.%20%E6%97%A0%E9%87%8D%E5%A4%8D%E5%AD%97%E7%AC%A6%E7%9A%84%E6%9C%80%E9%95%BF%E5%AD%90%E4%B8%B2.js)
- [最长公共子序列](./code/1143.%E6%9C%80%E9%95%BF%E5%85%AC%E5%85%B1%E5%AD%90%E5%BA%8F%E5%88%97.js)
- [4. 寻找两个正序数组的中位数.js](./code%2F4.%20%E5%AF%BB%E6%89%BE%E4%B8%A4%E4%B8%AA%E6%AD%A3%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E4%B8%AD%E4%BD%8D%E6%95%B0.js)

## 栈、队列

- [最小栈](./code/155.%E6%9C%80%E5%B0%8F%E6%A0%88.js)
- [有效括号](./code/20.%20%E6%9C%89%E6%95%88%E7%9A%84%E6%8B%AC%E5%8F%B7.js)
- [简化路径](./code/71.%E7%AE%80%E5%8C%96%E8%B7%AF%E5%BE%84.js)
- [剑指 Offer 09. 用两个栈实现队列](./%E6%AF%8F%E5%91%A8%E7%9A%84%E9%A2%98%E8%A7%A3/%E5%89%91%E6%8C%87offer.md)

## 哈希表

- [1. 两数之和.js](./code%2F1.%20%E4%B8%A4%E6%95%B0%E4%B9%8B%E5%92%8C.js)
- [15. 三数之和.js](./code%2F15.%20%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.js)
- [42.接雨水.js](./code%2F42.%E6%8E%A5%E9%9B%A8%E6%B0%B4.js)

## 链表

> 链表经常和指针一起考察

- [反转链表](./code/206.%20%E5%8F%8D%E8%BD%AC%E9%93%BE%E8%A1%A8.js)
- [两两交换链表中的节点](./code/24.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B9.js)
- [k 个一组反转链表](./code/25.k-%E4%B8%AA%E4%B8%80%E7%BB%84%E7%BF%BB%E8%BD%AC%E9%93%BE%E8%A1%A8.js)
- [环形链表](./code/141.%20%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8.js)
- [合并两个有序链表](./code/21.%E5%90%88%E5%B9%B6%E4%B8%A4%E4%B8%AA%E6%9C%89%E5%BA%8F%E9%93%BE%E8%A1%A8.js)
- [相交链表](./code/160.%E7%9B%B8%E4%BA%A4%E9%93%BE%E8%A1%A8.js)
- [剑指 Offer 22. 链表中倒数第 k 个节点](./%E6%AF%8F%E5%91%A8%E7%9A%84%E9%A2%98%E8%A7%A3/%E5%89%91%E6%8C%87offer.md)
- [剑指 Offer 36. 二叉搜索树与双向链表](./%E6%AF%8F%E5%91%A8%E7%9A%84%E9%A2%98%E8%A7%A3/%E5%89%91%E6%8C%87offer.md)

## 二叉树

- [二叉树前序遍历](./code/144.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E5%89%8D%E5%BA%8F%E9%81%8D%E5%8E%86.js)
- [二叉树中序遍历](./code/94.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E4%B8%AD%E5%BA%8F%E9%81%8D%E5%8E%86.js)
- 二叉树后序遍历、
- [二叉树锯齿型遍历](./code/103.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E9%94%AF%E9%BD%BF%E5%BD%A2%E5%B1%82%E5%BA%8F%E9%81%8D%E5%8E%86.js)
- [二叉树最大深度](./code/104.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E5%A4%A7%E6%B7%B1%E5%BA%A6.js)
- 二叉树最小深度
- [二叉树第 k 个结点](./code/%E5%89%91%E6%8C%87%20Offer%2054.%20%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E7%9A%84%E7%AC%ACk%E5%A4%A7%E8%8A%82%E7%82%B9.js)
- [对称二叉树](./code/101.%E5%AF%B9%E7%A7%B0%E4%BA%8C%E5%8F%89%E6%A0%91.js)
- [二叉树的最近公共祖先](./code/236.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88.js)
- [二叉树中的最大路径和](./code/124.%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%AD%E7%9A%84%E6%9C%80%E5%A4%A7%E8%B7%AF%E5%BE%84%E5%92%8C.js)

二叉搜索树

- [二叉搜索树中的第 k 小的元素](./code/230.%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E4%B8%AD%E7%AC%ACk%E5%B0%8F%E7%9A%84%E5%85%83%E7%B4%A0.js)
- [剑指 Offer 36. 二叉搜索树与双向链表](./%E6%AF%8F%E5%91%A8%E7%9A%84%E9%A2%98%E8%A7%A3/%E5%89%91%E6%8C%87offer.md)

## 排序

- [归并排序](./code/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F.js)
- [56.合并区间.js](./code%2F56.%E5%90%88%E5%B9%B6%E5%8C%BA%E9%97%B4.js)
- [剑指 Offer 51. 数组中的逆序对|归并排序](./%E6%AF%8F%E5%91%A8%E7%9A%84%E9%A2%98%E8%A7%A3/%E5%89%91%E6%8C%87offer.md)

## 二分查找

- [4. 寻找两个正序数组的中位数.js](./code%2F4.%20%E5%AF%BB%E6%89%BE%E4%B8%A4%E4%B8%AA%E6%AD%A3%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E4%B8%AD%E4%BD%8D%E6%95%B0.js)

## BFS|DFS|回溯

- [岛屿最大面积](./code/695.%E5%B2%9B%E5%B1%BF%E7%9A%84%E6%9C%80%E5%A4%A7%E9%9D%A2%E7%A7%AF.js)
- [岛屿数量](./code/200.%E5%B2%9B%E5%B1%BF%E6%95%B0%E9%87%8F.js)
- N 皇后
- [全排列](./code/46.%E5%85%A8%E6%8E%92%E5%88%97.js)
- [下一个排列](./code/31.%E4%B8%8B%E4%B8%80%E4%B8%AA%E6%8E%92%E5%88%97.js)
- [括号生成](./code/22.%E6%8B%AC%E5%8F%B7%E7%94%9F%E6%88%90.js)
- [复原 IP 地址](./code/93.%E5%A4%8D%E5%8E%9F-ip-%E5%9C%B0%E5%9D%80.js)

## 动态规划

- [剑指 Offer 10- I. 斐波那契数列](./%E6%AF%8F%E5%91%A8%E7%9A%84%E9%A2%98%E8%A7%A3/%E5%89%91%E6%8C%87offer.md)
- [剑指 Offer 10- II. 青蛙跳台阶问题](./%E6%AF%8F%E5%91%A8%E7%9A%84%E9%A2%98%E8%A7%A3/%E5%89%91%E6%8C%87offer.md)
- [300.最长递增子序列.js](./code%2F300.%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97.js)
- [最长重复子数组](./code/718.%E6%9C%80%E9%95%BF%E9%87%8D%E5%A4%8D%E5%AD%90%E6%95%B0%E7%BB%84.js)
- [322.零钱兑换.js](./code%2F322.%E9%9B%B6%E9%92%B1%E5%85%91%E6%8D%A2.js)
- [1143.最长公共子序列.js](./code%2F1143.%E6%9C%80%E9%95%BF%E5%85%AC%E5%85%B1%E5%AD%90%E5%BA%8F%E5%88%97.js)
- [53. 最大子序和.js](./code%2F53.%20%E6%9C%80%E5%A4%A7%E5%AD%90%E5%BA%8F%E5%92%8C.js)
- [剑指 Offer 42. 连续子数组的最大和|动态规划|前缀和](./%E6%AF%8F%E5%91%A8%E7%9A%84%E9%A2%98%E8%A7%A3/%E5%89%91%E6%8C%87offer.md) 这里和上一题一样，只不过第二次写题解写详细了点
- 72.编辑距离
- [121. 买卖股票的最佳时机.js](./code%2F121.%20%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E7%9A%84%E6%9C%80%E4%BD%B3%E6%97%B6%E6%9C%BA.js)
- [122.买卖股票的最佳时机-ii.js](./code%2F122.%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E7%9A%84%E6%9C%80%E4%BD%B3%E6%97%B6%E6%9C%BA-ii.js)

> 还有一些没放上来

# 库实现

- [mini-koa ](./mini/koa)
- [mini-redux ](./mini/redux)
- [mini-react ](./mini/react)

# 关于更新

> 一开始是打算重新随便刷一下 leetcode
> 后来补充了一下手写题
> 又补充了一下一些 mini 库的实现
> 现在打算**整理一下方便读者**

## 2022.10.16 新增流行库的 mini 实现

在 `mini` 文件夹

## 2022.9.6 新增手写板块

代码放在 `Handwriting`文件夹，将分三部分：

- JS 基础
- 数据操作
- 常见应用 utils

---

# 为什么算是重新

**之前应该算是刷了不少了**

[https://leetcode.cn/u/okkjoo/](https://leetcode.cn/u/okkjoo/)

![](https://cdn.nlark.com/yuque/0/2022/png/2925491/1652541003301-af424f1b-890b-46c0-9440-6b9ac7a3124a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_QG9ra2pvbw%3D%3D%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

## 语言变化

但是全部都是用 cpp 写的，现在想用 JS 再写一遍

## 记忆

**还有就是 真的忘记了啊 太久没写算法了~**

**算是给 艾宾浩斯遗忘曲线 狠狠地教育了~**

# 指导方针

## 三个标准：

1. **可读性**
2. **时间复杂度**
3. **空间复杂度**

## 主要步骤

1. **拿到题目**

   1. **审题**
   2. **抽象算法模型**
   3. **思路优化**

2. **先写关键点（主要方法，算法标签）**
3. **写注释和代码**

## 刷题速度

每周十题左右吧，题解按周分文件

# 参考资源

## 题目来自

当然来自力扣，但是具体怎么选择是根据 [codeTop](https://codetop.cc/home) 直接选择前端分区按频率从高往低刷~ 这次不分类了，反正之前也刷过，最多看看题解也就捡回来了吧~这种随机的刷或许也更接近面试

---

> 这一遍算是重新用 JS 刷一次高频面试，合集仓库：[okkjoo-leetcodeHot-byJs](https://github.com/okkjoo/okkjoo-leetcodeHot-byJs)
