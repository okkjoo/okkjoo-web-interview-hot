/**
 * apply 就是参数列表为类数组对象的 call
 * func.apply(this, arguments) == func.call(this, ...arguments)
 * @param {any} context 待绑定的上下文
 * @param {Array<any>} 数组形式传入的参数
 * @returns
 */
Function.prototype._apply = function (context = globalThis) {
	const args = arguments[1] || [];
	const key = Symbol('key');
	context[key] = this;
	const res = context[key](...args);
	delete context[key];
	return res;
};

//test
globalThis.name = 1;
const a = function () {
	console.log(this.name);
	console.log([...arguments]);
};
a(); //1 []

const A = { name: 2333 };
a._apply(A, [1, 2, 3]); //2333   [ 1, 2, 3 ]
