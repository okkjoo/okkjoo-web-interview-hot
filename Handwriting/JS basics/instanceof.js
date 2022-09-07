/**
 * instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 * @param {Object} obj 待判断的对象
 * @param {function} fun 构造函数
 * @returns {boolean}
 */
const _instanceof = (obj, fun) => {
	// 用 Object.getPrototypeOf 获取其原型
	let p = Object.getPrototypeOf(obj),
		p2 = fun.prototype;

	while (1) {
		if (!p) return false;
		if (p === p2) return true;
		//一层一层往上找
		p = Object.getPrototypeOf(p);
	}
};

//test
const a = new Number('1');
console.log(a instanceof Number); //true
console.log(a instanceof Object); //true
console.log(a instanceof String); //false

console.log(_instanceof(a, Number)); //true
console.log(_instanceof(a, Object)); //true
console.log(_instanceof(a, String)); //false

console.log(_instanceof(a, a)); //false

/** more
 * 对传入参数的判断
 */
