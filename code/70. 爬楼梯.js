/**
 * @param {number} n
 * @return {number}
 * dp方法
 */
var climbStairs = function (n) {
	let p = 0,
		q = 0,
		r = 1;
	for (let i = 1; i <= n; ++i) {
		p = q;
		q = r;
		r = p + q;
	}
	return r;
};
/**
 * @param {number} n
 * @return {number}
 * 矩阵快速幂方法
 */
var climbStairs = function (n) {
	const q = [
		[1, 1],
		[1, 0],
	];
	const res = quick_pow(q, n);
	return res[0][0];
};
//快速幂 return a^n
const quick_pow = (a, n) => {
	//注意要先构建一个单位矩阵，再进行幂的运算
	let M = [
		[1, 0],
		[0, 1],
	];
	while (n > 0) {
		if (n & 1) {
			M = multiply(M, a);
		}
		n >>= 1;
		a = multiply(a, a);
	}
	return M;
};
//矩阵乘法
const multiply = (a, b) => {
	const c = new Array(2).fill(0).map(() => new Array(2).fill(0)); //创建一个空的2*2数组用于存储结果
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < 2; j++) {
			c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j]; //矩阵乘法
		}
	}
	return c;
};
