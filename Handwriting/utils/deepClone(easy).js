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
