/* 
Object.freeze() 方法可以冻结一个对象。
一个被冻结的对象再也不能被修改；
冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，
不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。
此外，冻结一个对象后该对象的原型也不能被修改。
freeze() 返回和传入的参数相同的对象。
*/
/* 
要注意的点:
不可枚举的属性
Symbol 类型的 key 
只冻对象自有的属性（for ... in 会把原型链上的可枚举属性遍历出来）
不可扩展性
API ：
Object.freeze() 冻结，强调不可改变
Object.preventExtensions() 让一个对象变的不可扩展，也就是永远不能再添加新的属性。 —— 但可以删除
Object.seal()  强调封闭，阻止添加新属性并将所有现有属性标记为不可配置。—— 但当前属性的值只要原来是可写的就可以改变。
*/
const _objectFreeze = object => {
	const keys = Object.getOwnPropertyNames(object);
	const symbolKeys = Object.getOwnPropertySymbols(object);
	[...keys, ...symbolKeys].forEach(key => {
		Object.defineProperty(object, key, {
			configurable: false,
			writable: false,
		});
	});
	// Object.preventExtensions(object);
	Object.seal(object);
};

//test
function test() {
	const o = { name: 'z', fn: function () {} };
	_objectFreeze(o);
	o.name = 'g';
	o.fn = 1;
	o.o = 1;
	const result =
		o.name === 'z' && typeof o.fn === 'function' && o.o === undefined;
	return result;
}

console.log(test()); //test

const a = { a: '', b: { 1: '2' } };
// Object.preventExtensions(a);
// Object.seal(a);
Object.freeze(a);
delete a['a'];
a.b['1'] = 1;
console.log(a); // { a: '', b: { 1: 1 } }

const c = { a: '', b: { 1: '2' } };
_objectFreeze(c);
delete c['a'];
c.b['1'] = 1;
console.log(c); // { a: '', b: { 1: 1 } }
