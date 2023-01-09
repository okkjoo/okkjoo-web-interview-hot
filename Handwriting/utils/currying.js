/* 
柯里化（Currying），又称部分求值（Partial Evaluation）
把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数
并且返回接受余下的参数而且返回结果的新函数的技术。
核心思想是把多参数传入的函数拆成单参数（或部分）函数，
内部再返回调用下一个单参数（或部分）函数，依次处理剩余的参数。
*/
function currying(fn, ...args) {
	const length = fn.length;
	let allArgs = [...args];
	console.log(allArgs.length);
	function res(...newArgs) {
		allArgs = [...allArgs, ...newArgs];
		if (allArgs.length === length) {
			return fn(...allArgs);
		} else return res;
	}
	return res;
}

//test
const add = (a, b, c) => a + b + c;
const t = currying(add, 1);
console.log(t(2)(3)); //6
console.log(add(1, 2, 3)); //6
