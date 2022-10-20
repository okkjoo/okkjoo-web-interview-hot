/* ES5 实现 ES6 const ——  削弱版 —— 肯定没法完全复刻啦 */
/* 重点： 声明的变量为常量，不可修改 */
function myConst(key, value) {
	if (this[key]) {
		throw new Error('Cannot redefine property: ' + key);
	}
	this.key = value; // this: 浏览器上就是 window ，node 中就是 global
	Object.defineProperty(this, key, {
		enumerable: false,
		configurable: false,
		get: function () {
			return value;
		},
		set: function () {
			throw new TypeError('Assignment to constantaa variable.');
		},
	});
}

//test

myConst('a', 110);
console.log(Object.getOwnPropertyDescriptor(this, 'a'));
console.log(a);
myConst('a', 110); // Error: Cannot redefine property: a
a = 99; // Error: Assignment to constant variable.'
console.log(a);
