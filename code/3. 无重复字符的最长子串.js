/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	const set = new Set(); //记录窗口内元素是否出现过
	let i = 0,
		j = 0,
		res = 0; //左右指针、答案
	if (s.length == 0) return 0; //特殊情况
	while (j < s.length) {
		//右边界小于字符串长度
		if (!set.has(s[j])) {
			//set中没有
			set.add(s[j]); //放入set中
			res = Math.max(res, set.size); //看看答案要不要更新
		} else {
			//set中已经有了
			while (set.has(s[j])) {
				//右移左边界直到没有重复字符
				set.delete(s[i]);
				i++;
			}
			set.add(s[j]); //将右边界字符加入
		}
		j++; //无论如何右边界都是一直走的
	}
	return res;
};
