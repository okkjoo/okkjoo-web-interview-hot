/**
 * bind 绑定 this
 * @param {any} context 待绑定的上下文
 * @returns 绑定好 this 的函数
 */
Function.prototype._bind = function (context = globalThis) {
	const self = this,
		boundArgs = arguments;
	return function () {
		let i = 0,
			args = [];
		for (i = 1; i < boundArgs.length; i++) args.push(boundArgs[i]);
		for (i = 0; i < arguments.length; i++) args.push(arguments[i]);
		return self.apply(context, args);
	};
};

//test
function f(b) {
	console.log(this.a, b);
}

f._bind({ a: 3 })(4); //  3, 4

f._bind({ a: 66 }, 10)(11); // 66, 10
