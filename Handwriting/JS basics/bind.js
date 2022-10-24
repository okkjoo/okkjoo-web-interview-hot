/**
 * bind 绑定 this
 * @param {any} context 待绑定的上下文
 * @returns 绑定好 this 的函数
 */
Function.prototype._bind = function (context = globalThis, ...args) {
	const fn = this;
	return function (...args2) {
		return fn.apply(context, args.concat(args2));
	};
};

//test
function f(b) {
	console.log(this.a, b);
}

f._bind({ a: 3 })(4); //  3, 4

f._bind({ a: 66 }, 10)(11); // 66, 10

//牛客上的测试样例
function test() {
	const o1 = {
		name: 'z',
		fn: function () {
			return this.name;
		},
	};
	const o2 = { name: 'g' };
	const result = o1.fn._bind(o2);
	return result() === 'g';
}

console.log(test());
