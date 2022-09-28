/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var CheckPermutation = function (s1, s2) {
	const mp = new Map();
	for (let c of s1) mp.set(c, (mp.get(c) || 0) + 1);
	for (let c of s2) mp.set(c, (mp.get(c) || 0) - 1);
	for (let v of mp.values()) {
		if (v !== 0) return false;
	}
	return true;
};
