/**
 * dp
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
	if (!s || !s.length) return "";
	let res = s[0];
	const dp = [];
	// dp[i][] 依赖 dp[i-1][] --> 干脆反着遍历
	for (let i = s.length - 1; i >= 0; i--) {
		dp[i] = [];
		for (let j = i; j < s.length; j++) {
			if (j === i) dp[i][j] = true; // d[i][i] 一个字符当然回文
			else if (j === i + 1 && s[i] === s[j]) dp[i][j] = true; //dp[i][i+1]
			else if (s[i] === s[j] && dp[i + 1][j - 1]) dp[i][j] = true;
			// 有更长的就要更新
			if (dp[i][j] && j - i + 1 > res.length) res = s.slice(i, j + 1);
		}
	}
	return res;
};

/**
 * manacher
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
	const lens = s.length;
	// 预处理字符数组
	let str = "#";
	for (let i = 0; i < lens; i++) {
		str = str + s[i] + "#";
	}
	// 当前回文子串能到达的右边界和它的中心
	let mid = 0,
		right = 0;
	// 最长的回文子串的中心和长度
	let maxLen = 0,
		maxLenMid = 0;
	// child[i]: 以i为中心的最长回文
	const child = [];
	// 遍历处理过的字符串，以每个字符中心进行扩展
	for (let i = 0; i < str.length; i++) {
		// 第i个字符，如果在最右边界的羽翼下，就选择对称字符的回文长度
		// 不在右边界内就赋值1
		child[i] = i < right ? Math.min(child[2 * mid - i], right - i) : 1;
		// 不论怎么样都要试一试暴力扩展
		while (
			i - child[i] >= 0 &&
			i + child[i] < str.length &&
			str.charAt(i + child[i]) == str.charAt(i - child[i])
		) {
			child[i]++;
		}
		// 更新右边界
		if (right < child[i] + i) {
			mid = i;
			right = child[i] + i;
		}
		// 是否更新最长回文子串
		if (maxLen < child[i]) {
			maxLen = child[i];
			maxLenMid = i;
		}
	}
	return s.substring(
		(maxLenMid + 1 - maxLen) / 2,
		(maxLenMid - 1 + maxLen) / 2
	);
};
