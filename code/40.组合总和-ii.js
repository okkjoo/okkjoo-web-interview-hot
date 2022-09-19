/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
	const res = [],
		path = [],
		len = candidates.length;
	candidates.sort();

	const dfs = (sum, i) => {
		if (sum > target) return;
		if (sum === target) {
			res.push([...path]);
			return;
		}

		let pre = -1; //recored last
		for (let j = i; j < len; j++) {
			const cur = candidates[j];
			if (cur > target - sum || cur === pre) continue;
			path.push(cur);
			sum += cur;
			pre = cur;
			//往下走
			dfs(sum, j + 1);
			//回溯
			path.pop();
			sum -= cur;
		}
	};

	dfs(0, 0);

	return res;
};
// @lc code=end
