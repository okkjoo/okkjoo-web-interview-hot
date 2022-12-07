/* 
已经写了一个难度大的深拷贝
来个要求低一点的
1. 参数对象和参数对象的每个数据项的数据类型范围仅在数组、普通对象（{}）、基本数据类型中]
2. 无需考虑循环引用问题
*/

const _sampleDeepClone = target => {
	if (typeof target === 'object' && target !== null) {
		const o = Array.isArray(target) ? [] : {};
		for (const k in target) {
			if (target.hasOwnProperty(k)) {
				o[k] = _sampleDeepClone(target[k]);
			}
		}
		return o;
	} else return target;
};

//test
function test() {
	const o1 = { name: 'g', age: 18, o: { name: 'o' }, a: [1, 2] };
	const o2 = _sampleDeepClone(o1);
	const judge =
		JSON.stringify(o1) === JSON.stringify(o2) && o1.o !== o2.o && o1.a !== o2.a;
	return judge;
}

console.log(test()); //true

/* 稍微上点难度
1. 需要考虑函数、正则、日期、ES6新对象 —— 特殊处理一下就行
2. 需要考虑循环引用问题 —— 用一个 Map 作为缓存记录一下
*/
const _completeDeepClone = (target, map = new Map()) => {
	if (typeof target !== 'object' && typeof target !== 'function') return target;
	// 这里不特殊判断其实结果也对，因为在下面也还是借助构造器 new 了全新的对象(不论是什么对象)，主要减少了一次遍历吧
	if (/^(Function|RegExp|Date|Map|Set)$/i.test(target.constructor.name))
		return new target.constructor(target);
	// if (map.has(target)) return target;
	// map.set(target, true);
	if (map.has(target)) return map.get(target);
	const o = new target.constructor();
	map.set(target, o);
	for (const k in target) {
		if (target.hasOwnProperty(k)) {
			o[k] = _completeDeepClone(target[k], map);
		}
	}
	return o;
};

//test
function test2() {
	const o1 = {
		name: 'g',
		age: 18,
		o: { name: 'o' },
		a: [1, 2],
		r: new RegExp(),
		d: new Date(),
	};
	o1.self = o1;
	const o2 = _completeDeepClone(o1);
	o1.name = 'z';
	o1.age = 1;
	const judge =
		o1.name !== o2.name &&
		o1.age !== o2.age &&
		o1.o !== o2.o &&
		o1.a !== o2.a &&
		o1.r !== o2.r &&
		o1.d !== o2.d &&
		o1.self.self.self.self.self.self.self.self.self === o1.self &&
		o1.self !== o2.self; //*
	return judge;
}

console.log(test2()); //true
const o1 = {
	name: 'g',
	age: 18,
	o: { name: 'o' },
	a: [1, 2],
	r: new RegExp(),
	d: new Date(),
};
o1.self = o1;
const o2 = _completeDeepClone(o1);

console.log(o1.self);
console.log(o2.self);
