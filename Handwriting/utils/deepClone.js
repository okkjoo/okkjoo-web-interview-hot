/* 
deepClone 
简易 API 版： JSON.parse(JSON.stringify())
存在的问题：
  a. 循环引用问题
  b. 特殊对象
  c. 函数的拷贝

*/
// import getType from './getType'; //这里是直接从 那个文件里粘贴过来的，为了方便控制台调试
const getType = value => {
	// 对象为 null
	if (value === null) {
		return value + '';
	}
	// 对象为引用类型（除函数外
	if (typeof value === 'object') {
		const toString = Object.prototype.toString;
		return toString.call(value).slice(8, -1).toLowerCase();
	} else {
		//为基本类型或者函数
		return typeof value;
	}
};
/**
 * 判断是否为对象(包括函数)
 * @param {any} target 要判断的变量
 * @returns {boolean} 是否为对象(包括函数)
 */
const isObject = target =>
	(typeof target === 'object' || typeof target === 'function') &&
	target !== null;

/* 可遍历的类型 */
const canTraverse = {
	map: true,
	set: true,
	array: true,
	object: true,
	arguments: true,
};

const mapTag = 'map';
const setTag = 'set';
const boolTag = 'boolean';
const numberTag = 'number';
const stringTag = 'string';
const symbolTag = 'symbol';
const dateTag = 'date';
const errorTag = 'error';
const regexpTag = 'regexp';
const funcTag = 'function';

const handleRegExp = target => {
	const { source, flags } = target;
	return new target.constructor(source, flags);
};

const handleFunc = func => {
	// 箭头函数直接返回自身
	if (!func.prototype) return func;
	const bodyReg = /(?<={)(.|\n)+(?=})/m;
	const paramReg = /(?<=\().+(?=\)\s+{)/;
	const funcString = func.toString();
	// 分别匹配 函数参数 和 函数体
	const param = paramReg.exec(funcString);
	const body = bodyReg.exec(funcString);
	if (!body) return null;
	if (param) {
		const paramArr = param[0].split(',');
		return new Function(...paramArr, body[0]);
	} else {
		return new Function(body[0]);
	}
};

/**
 * 对不可遍历的对象执行不同的处理
 * @param {any} target 不能遍历的对象
 * @param {string} tag 处理标志
 * @returns {object} 拷贝得到的对象
 */
const handleNotTraverse = (target, tag) => {
	const Ctor = target.constructor;
	switch (tag) {
		case boolTag:
			/* ES6 不推荐 new 基础类型 写法 so: */
			/* valueOf 主要为了 Boolean 类型不会有 bug */
			return new Object(Boolean.prototype.valueOf.call(target));
		case numberTag:
			return new Object(Number.prototype.valueOf.call(target));
		case stringTag:
			return new Object(String.prototype.valueOf.call(target));
		case symbolTag:
			return new Object(Symbol.prototype.valueOf.call(target));
		case errorTag:
		case dateTag:
			return new Ctor(target);
		case regexpTag:
			return handleRegExp(target);
		case funcTag:
			return handleFunc(target);
		default:
			return new Ctor(target);
	}
};

/**
 *  深拷贝
 * @param {any} target 待拷贝的对象
 * @param {WeakMap} cache 用于解决循环引用问题
 * @returns {any} 拷贝完的对象
 */
const deepClone = (target, cache = new WeakMap()) => {
	if (!isObject(target)) return target;
	let type = getType(target);
	let cloneTarget;
	if (!canTraverse[type]) {
		return handleNotTraverse(target, type);
	} else {
		// 保证对象的原型不丢失
		let ctor = target.constructor;
		cloneTarget = new ctor();
	}

	if (cache.get(target)) return target;
	cache.set(target, true);

	if (type === mapTag) {
		target.forEach((item, key) => {
			cloneTarget.set(deepClone(key, cache), deepClone(item, cache));
		});
	}

	if (type === setTag) {
		target.forEach(item => {
			cloneTarget.add(deepClone(item, cache));
		});
	}

	// 处理数组和对象
	for (let prop in target) {
		if (target.hasOwnProperty(prop)) {
			cloneTarget[prop] = deepClone(target[prop], cache);
		}
	}
	return cloneTarget;
};

//test
const mp = new Map([
	[1, 2],
	['1', 2],
]);
const st = new Set([1, 2, 3]);
const f = function () {
	console.log('f');
};
const af = () => void console.log('af');
const obj = { s: [1, 2] };
obj.ss = obj;
const a = [1, '1', mp, st, f, af, obj, false];

const b = deepClone(a);
console.log(b); //太长不放注释里了
a[2].set(9, 0);
console.log(a[2]); //Map { 1 => 2, '1' => 2, 9 => 0 }
console.log(b[2]); //Map { 1 => 2, '1' => 2 }

a[3].add('o');
console.log(a[3]); //Set { 1, 2, 3, 'o' }
console.log(b[3]); //Set { 1, 2, 3 }

a[4] = function () {
	console.log('update');
};
a[4](); //update
b[4](); //f

a[5](); //af
b[5](); //af

a[6].test = 'test';
console.log(a[6]); //{ s: [ 1, 2 ], ss: [Circular], test: 'test' }
console.log(b[6]); //{ s: [ 1, 2 ], ss: { s: [ 1, 2 ], ss: [Circular], test: 'test' } }

console.log(a[7]); //false
console.log(b[7]); //false
