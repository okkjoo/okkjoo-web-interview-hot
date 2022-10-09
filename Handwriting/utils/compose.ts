/**
 * > from: https://github.com/reduxjs/redux/blob/master/src/compose.ts
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 *
 * @param fns The functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
const compose = (...fns: Function[]) => {
	if (fns.length === 0) return <T>(arg: T) => arg;
	if (fns.length === 1) return fns[0];
	return fns.reduce(
		(a, b) =>
			(...args: any) =>
				a(b(...args))
	);
};

//test
const add10 = (x: number) => x + 10;
const mul10 = (x: number) => x * 10;
const add100 = (x: number) => x + 100;

// (10 + 100) * 10 + 10 = 1110
console.log(compose(add10, mul10, add100)(10)); // 1110

// 再实现一个从左到右执行的
const composeL2R = (...fns: Function[]) => {
	if (fns.length === 0) return <T>(arg: T) => arg;
	if (fns.length === 1) return fns[0];
	return fns.reduceRight(
		(a, b) =>
			(...args: any) =>
				a(b(...args))
	);
};

// (10 + 10) * 10 + 100
console.log(composeL2R(add10, mul10, add100)(10)); //
