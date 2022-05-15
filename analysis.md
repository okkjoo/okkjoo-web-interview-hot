# 题解

这里的顺序也是按出现频率的~

# 3. 无重复字符的最长子串

- [ leetcode](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)
-

### 解题思路

最长子串——看到这两个关键字你就要想到滑动窗口，那么这道题就是窗口大小无限制的滑动窗口~ 滑动窗口具体控制就是双指针啦

然后需要求得的就是 满足条件（不含重复字符）的窗口中，最大的窗口。

- 用一个 set 存储窗口内的元素
- 当窗口内没有重复字符时就不断地向右边扩张

  - 新的右边界字符存入 set

- 出现重复后就缩小左边的窗口

  - 左边界限向右移动

- 直到最右边界限

### 代码

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const set = new Set();//记录窗口内元素是否出现过
    let i = 0, j = 0, res = 0;//左右指针、答案
    if(s.length == 0)return 0;//特殊情况
    while(j < s.length){//右边界小于字符串长度
        if(!set.has(s[j])){//set中没有
            set.add(s[j]);//放入set中
            res = Math.max(res, set.size);//看看答案要不要更新
        }else{//set中已经有了
            while(set.has(s[j])){//右移左边界直到没有重复字符
                set.delete(s[i]);
                i++;
            }
            set.add(s[j]);//将右边界字符加入
        }
        j++;//无论如何右边界都是一直走的
    }
    return res
};

```
