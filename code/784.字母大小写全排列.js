/*
 * @lc app=leetcode.cn id=784 lang=javascript
 *
 * [784] 字母大小写全排列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
	const ans = [];
	const dfs = (arr, idx) => {
		while (idx < arr.length && !isLetter(arr[idx])) idx++;
		if (idx === arr.length) {
			ans.push(arr.join(''));
			return;
		}
		dfs(arr, idx + 1, ans);
		arr[idx] = String.fromCharCode(arr[idx].charCodeAt() ^ 32);
		dfs(arr, idx + 1, ans);
	};
	dfs([...s], 0, ans);
	return ans;
};
const isLetter = ch => {
	return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z');
};

// @lc code=end
