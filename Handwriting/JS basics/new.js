/**
 * 首先，new做了：
 * 1. 创建一个新的对象
 * 2. 吧对象原型设置为构造函数的 prototype 对象
 * 3. 让函数的 this 指向这个对象，然后执行构造函数
 *    给新对象添加属性
 * 4. 判断函数返回值类型，如果是基础类型，就返回值对象
 *    如果是引用类型，就返回这个引用类型的对象
 */
/**
 * @params 第一个参数是构造函数，后面是传入构造函数的参数
 * @returns {object}
 */
function _new() {
	const constructor = Array.prototype.shift.call(arguments);
	//首先传入的第一个参数要是一个函数
	if (typeof constructor !== 'function') {
		console.log(`TypeError: ${constructor} is not a constructor`);
		return;
	}
	//新对象的原型要为构造函数的 prototype 对象
	let obj = Object.create(constructor.prototype);
	// 让构造函数的 this 指向新对象，并执行函数,将执行结果存入 result
	let result = constructor.apply(obj, arguments);

	// 判断构造函数执行结果
	if (result && (typeof result === 'object' || typeof result === 'function'))
		return result;
	return obj;
}

//test
function Person(firtName, lastName) {
	this.firtName = firtName;
	this.lastName = lastName;

	return 'demo'; //返回基础类型
}
const a = new Person('zz', 'qq');
console.log(a); //Person { firtName: 'zz', lastName: 'qq' }

const a2 = _new(Person, 'zz', 'qq');
console.log(a2); //Person { firtName: 'zz', lastName: 'qq' }

function Person2(firtName, lastName) {
	this.firtName = firtName;
	this.lastName = lastName;

	return { one: 'new obj', firtName }; //返回对象
}

const b = new Person2('zz', 'qq');
console.log(b); //{ one: 'new obj', firtName: 'zz' }

const b2 = _new(Person2, 'zz', 'qq');
console.log(b2); //{ one: 'new obj', firtName: 'zz' }

_new(); //TypeError: undefined is not a constructor
new b();
