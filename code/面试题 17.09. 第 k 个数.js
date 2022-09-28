/**
 * @param {number} k
 * @return {number}
 */
var getKthMagicNumber = function (k) {
	let arr = [1];
	let j3 = 0,
		j5 = 0,
		j7 = 0;
	for (let i = 1; i < k; i++) {
		let a = arr[j3] * 3,
			b = arr[j5] * 5,
			c = arr[j7] * 7;
		arr[i] = Math.min(a, b, c);
		if (arr[i] === a) j3++;
		if (arr[i] === b) j5++;
		if (arr[i] === c) j7++;
	}
	return arr[k - 1];
};
