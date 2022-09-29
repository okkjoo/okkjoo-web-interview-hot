/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isFlipedString = function (s1, s2) {
	if (s1.length !== s2.length) return false;
	const s = s1 + s1;
	return s.search(s2) !== -1;
};
