/* 一、原型链继承 属性、方法都靠原型链 */
function Ap1() {}
Ap1.prototype.arr = [];
Ap1.prototype.hi = function (id) {
	console.log(id);
};

function Ac1() {}
Ac1.prototype = new Ap1(); //继承

const one1 = new Ac1();
one1.hi(1); // 1
const one2 = new Ac1();
one1.arr.push('one1');
console.log(one2.arr); //[ 'one1' ]
/* 问题：
1. 引用类型的值在各个实例中是同一个引用
2. 创建实例时，不能传参给父类构造器
 */

/* 二、借用构造器继承  就是借用父类的构造器当自己的来使用*/
/* 解决了上面说的第一种方法——原型链继承的问题 */
function Ap2(id) {
	this.arr = [];
	this.id = id;
}
Ap2.prototype.hi = function () {
	console.log(this.id);
};

function Ac2(id) {
	Ap2.call(this, id); //借用父类的构造器，也就是做了一份属性的副本，并在此传参
}
const two1 = new Ac2(1);
const two2 = new Ac2(2);
two1.arr.push(1);
console.log(two1.arr); //[1]
console.log(two2.arr); //[]
console.log(Ac2.hi); //undefined
/* 各个实例的引用类型属性不再是同一个引用了，并且可以传参给父类构造器
缺点是无法实现函数方法的复用
*/
/* 三、组合继承 就是前两种方法组合起来 */
function Ap3(id = 3) {
	this.arr = [];
	this.id = id;
}
Ap3.prototype.hi = function () {
	console.log(this.id);
};
function Ac3(id) {
	Ap3.call(this, id); //借用父类的构造器，也就是做了一份属性的副本，并在此传参
}
Ac3.prototype = new Ap3(); //用原型链来添加方法

const three1 = new Ac3(3);
three1.hi(); //3
/* 用父类构造器来添加属性，用原型链来添加方法，弥补了前两种方法的缺陷 
但是估计你也发现了，他还不够完美
它调用了两次父类的构造器
*/

/* 四、原型式继承 ： 前面都是先定义一个父类，现在直接跳过，用一个现成的类继承 
借助原型基于已有对象创建新的对象
Object.create 就是这种 —— 实现一个 Object.create ? 👇
*/
function create(parentInstance) {
	function Child() {}
	Child.prototype = parentInstance;
	return new Child();
}
const fourP = {
	f: function () {
		console.log(1);
	},
	arr: [],
};
const fourC1 = create(fourP);
const fourC2 = create(fourP);
fourC1.arr.push(1);
fourC1.f(); //1
fourP.arr.push('p');
console.log(fourC1.arr); //[1, 'p']
console.log(fourC2.arr); //[1, 'p']

/* 然后你就会发现，propotype 指向同一个实例
这就导致又出现第一个方法的问题了，引用类型的属性又是同一个 
然后也不能向父类传参
*/

/* 五、寄生继承 
创建一个用于封装继承过程的函数
*/
function parasiticCreate(parentInstance) {
	var childInstance = create(parentInstance); //就这封装了一层 ——就是寄生
	childInstance.f = function () {
		//这里加个方法，但是下面的子实例也用不了吖
		console.log(1);
	};
	return childInstance;
}
const fiveP = {
	arr: [],
};
const fiveC1 = create(fiveP);
const fiveC2 = create(fiveP);
fiveC1.arr.push(1);
console.log(fiveC2.arr); //[1]
console.log(fiveC1.f); // undefined

/* 个人评价全是缺点：引用类型共享、函数无法复用 */

/* 六、寄生组合式继承 class 其实就是这个方法的语法糖
借用构造器继承属性 + 寄生继承创建新对象（作为子类对象的新原型）
前面组合继承的缺点是会调用两次父构造函数
1. 一次是借用父类构造器
```js
Ap3.call(this, id); //借用父类的构造器，也就是做了一份属性的副本，并在此传参
```
2. 一次是设置子类型实例原型
```js
Ac3.prototype = new Ap3(); //用原型链来添加方法
```

想想第二次怎么可以省去 —— 并且还能 让 Child.prototype 连接到 Parent.prototype —— 寄生

function + new 继承
1. 继承父类属性：在子类构造函数中用 call 调用父构造函数来 
2. 连接原型链
3. 设置 constructor
*/

//test nowcoder
function Human(name) {
	this.name = name;
	this.kingdom = 'animal';
	this.color = ['yellow', 'white', 'brown', 'black'];
}
Human.prototype.getName = function () {
	return this.name;
};
function Chinese(name, age) {
	Human.call(this, name); //1 继承父类属性
	this.age = age;
	this.color = 'yellow';
}
Chinese.prototype = Object.create(Human.prototype); //2 寄生继承 连接原型链
Chinese.prototype.constructor = Chinese; //3 设置 constructor 保证子类实例的constructor无误
Chinese.prototype.getAge = function () {
	return this.age;
};

function test() {
	const o = new Chinese('z', 18);
	const judge =
		o.getAge() === 18 &&
		o.getName() === 'z' &&
		o.kingdom === 'animal' &&
		o.__proto__.constructor === Chinese;
	return judge;
}

console.log(test()); //true
