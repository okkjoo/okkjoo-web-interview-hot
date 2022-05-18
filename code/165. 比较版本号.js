/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
	const n = version1.length,
		m = version2.length;
	let i = 0,
		j = 0; //双指针
	while (i < n || j < m) {
		let a = 0,
			b = 0; //同一下标下的两个修订号
		for (; i < n && version1[i] !== "."; ++i) {
			a = a * 10 + version1[i] - "0";
		}
		++i; // 跳过点号
		for (; j < m && version2[j] !== "."; ++j) {
			b = b * 10 + version2[j] - "0";
		}
		++j; // 跳过点号
		if (a !== b) return a > b ? 1 : -1;
	}
	return 0;
};
