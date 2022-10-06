/*
 * @lc app=leetcode.cn id=927 lang=javascript
 *
 * [927] 三等分
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var threeEqualParts = function (arr) {
	const cnt1 = arr.reduce((sum, cur) => sum + cur, 0);
	if (cnt1 === 0) return [0, 2];
	if (cnt1 % 3 !== 0) return [-1, -1];
	const partc = Math.floor(cnt1 / 3);
	//通过 partc 找到每一份中 第一个 1 的位置
	let t1,
		t2,
		t3,
		idx1 = 0; //第几个1
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === 1) {
			idx1++;
			if (idx1 === 1) t1 = i;
			if (idx1 === partc + 1) t2 = i;
			if (idx1 === partc * 2 + 1) t3 = i;
		}
	}
	let len = arr.length - t3; //最后一段第一个 1 到末尾的长度
	if (t1 + len <= t2 && t2 + len <= t3) {
		let j = 0;
		while (t3 + j < arr.length) {
			//有一位不同就不行
			if (arr[t1 + j] !== arr[t2 + j] || arr[t1 + j] !== arr[t3 + j])
				return [-1, -1];
			j++;
		}
		return [t1 + len - 1, t2 + len];
	}
	return [-1, -1];
};
// @lc code=end
