/* 就是一个类，让它只能用 new 创建一次，之后每次new都是同一个玩意 ，这就单例
将类传入 singleton 得到就是单例模式之后的类

实现：就是用闭包存储 ins 实例变量，如已有实例，不再创建；如没有，就正常创建
*/

/* function singleton(className) {
	let ins;
	return class {
		constructor(...args) {
			if (!ins) {
				ins = new className(...args);
			}
			return ins;
		}
	};
} */
/* 上面方法的缺陷： 实例的构造器不同了， 无法在原型链上添加方法 —— 优化用代理 Proxy，劫持构造器 */
function singleton(className) {
	let ins;
	return new Proxy(className, {
		construct(target, args) {
			if (!ins) {
				ins = new target(...args);
			}
			return ins;
		},
	});
}

class TestClass {
	constructor(id) {
		console.log('test' + id);
	}
}

const TestClassSingle = singleton(TestClass);
const t1 = new TestClassSingle(1); //只输出 test1
const t2 = new TestClassSingle(2); //没有 test2
console.log(t1 === t2); //true
TestClassSingle.prototype.run = function () {
	console.log('run');
};
t1.run(); //run
