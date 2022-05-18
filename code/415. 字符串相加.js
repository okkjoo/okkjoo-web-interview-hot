/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
	let i = num1.length - 1,
		j = num2.length - 1;
	add = 0;
	const ans = [];
	while (i >= 0 || j >= 0 || add > 0) {
		const a = i >= 0 ? num1[i].charAt() - "0" : 0,
			b = j >= 0 ? num2[j].charAt() - "0" : 0;
		const res = a + b + add;
		ans.push(res % 10);
		add = Math.floor(res / 10);
		i--, j--;
	}
	return ans.reverse().join("");
};
