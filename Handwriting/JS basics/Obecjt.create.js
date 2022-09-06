/* 
  Object.create() 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）
*/
Object.prototype._create = function (obj) {
	//在内部创建一个临时的构造函数
	function F() {}
	//让传入的对象作为该构造函数的圆形
	F.prototype = obj;
	//返回其创建的一个实例
	return new F();
};

//test
const Big = {
	id: 10,
};

const a = Object._create(Big);
console.log(a.id); //10
console.log(Big.isPrototypeOf(a)); //true
console.log(a instanceof Big.constructor); //true
