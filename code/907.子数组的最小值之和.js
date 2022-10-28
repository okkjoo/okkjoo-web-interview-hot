/*
 * @lc app=leetcode.cn id=907 lang=javascript
 *
 * [907] 子数组的最小值之和
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */ var sumSubarrayMins = function (arr) {
	const n = arr.length;
	let stk = [];
	const left = new Array(n).fill(0); // left[i]:以arr[i]为最右且最小元素数目
	const right = new Array(n).fill(0); // right[i]:以arr[i]为最左且最小元素数目
	for (let i = 0; i < n; i++) {
		// <=
		while (stk.length !== 0 && arr[i] <= arr[stk[stk.length - 1]]) {
			stk.pop();
		}
		left[i] = i - (stk.length === 0 ? -1 : stk[stk.length - 1]);
		stk.push(i);
	}
	stk = [];
	for (let i = n - 1; i >= 0; i--) {
		// <
		while (stk.length !== 0 && arr[i] < arr[stk[stk.length - 1]]) {
			stk.pop();
		}
		right[i] = (stk.length === 0 ? n : stk[stk.length - 1]) - i;
		stk.push(i);
	}
	let ans = 0;
	const MOD = 1000000007;
	for (let i = 0; i < n; i++) {
		ans = (ans + left[i] * right[i] * arr[i]) % MOD;
	}
	return ans;
};

// @lc code=end
