/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
	const LIMIT = 4;
	const tmpSegments = new Array(LIMIT);
	const ans = [];
	// 初始字符串、当前第几段、当前段起始位
	const dfs = (s, segId, segStart) => {
		if (segId === LIMIT) {
			if (segStart === s.length) {
				ans.push(tmpSegments.join('.'));
			}
			return;
		}
		if (segStart === s.length) return;
		if (s.charAt(segStart) === '0') {
			tmpSegments[segId] = 0; //不能有前导0，所以当前为0就是该段为0
			dfs(s, segId + 1, segStart + 1);
		}
		let addr = 0;
		for (let segEnd = segStart; segEnd < s.length; segEnd++) {
			addr = addr * 10 + (s.charAt(segEnd) - '0');
			if (addr > 0 && addr <= 255) {
				tmpSegments[segId] = addr;
				dfs(s, segId + 1, segEnd + 1);
			} else {
				break;
			}
		}
	};
	dfs(s, 0, 0);
	return ans;
};
// @lc code=end
