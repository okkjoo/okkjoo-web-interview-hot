/* function + new 继承
1. 继承父类属性：在子类构造函数中用 call 调用父构造函数来 
2. 连接原型链
3. 设置 constructor
*/

// Parent
function Animal(name) {
	this.name = name || 'a';
}

Animal.prototype.hi = () => {
	console.log('hi');
};

// child
function Dog(name, say) {
	// 1
	Animal.call(this, name);
	this.say = say;
}

// 2
Dog.prototype = Object.create(Animal.prototype);

// 3 不加这句实例的 constructor 就是 Animal了
Dog.prototype.constructor = Dog;

const dog = new Dog();
console.log(dog instanceof Dog); //true
console.log(dog instanceof Animal); //true
console.log(dog.constructor); //Dog
dog.hi(); //hi
console.log(dog.name); // a
