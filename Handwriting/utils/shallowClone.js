/* assign 其实就是对象的浅拷贝 */
const _shallowClone = target => {
	if (typeof target === 'object' && target !== null) {
		const o = Array.isArray(target) ? [] : {};
		for (let k in target) {
			if (target.hasOwnProperty(k)) {
				o[k] = target[k];
			}
		}
		return o;
	} else return target;
};

//test
function test() {
	const o1 = {
		name: 'g',
		age: 18,
		fn: function () {},
		a: [1, 2],
		o: { name: 'o' },
		d: new Date(),
	};
	const o2 = _shallowClone(o1);
	o1.name = 'z';
	const result =
		o2.name === 'g' && o1.fn === o2.fn && o1.a === o2.a && o1.o === o2.o;
	return result;
}

console.log(test()); //true
