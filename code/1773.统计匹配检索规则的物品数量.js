/*
 * @lc app=leetcode.cn id=1773 lang=javascript
 *
 * [1773] 统计匹配检索规则的物品数量
 */

// @lc code=start
/**
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
var countMatches = function (items, ruleKey, ruleValue) {
	let ans = 0,
		idx = ruleKey[0] === 't' ? 0 : ruleKey[0] === 'c' ? 1 : 2;
	for (const item of items) {
		if (item[idx] === ruleValue) ans++;
	}
	return ans;
};
// @lc code=end
