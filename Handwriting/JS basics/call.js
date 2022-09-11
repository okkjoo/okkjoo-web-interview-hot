/* 
call:
1. 判断调用的对象是否为 function 
2. 判断传入的上下文
3. 处理传入的参数
4. 将函数作为上下文的一个方法
5. 调用该函数，将结果存起来
6. 删除刚才新的属性
7. 返回结果
*/
/**
 *由使用的函数调用
 * @param {Object} context 待绑定的对象
 * @returns 返回调用结果
 */
Function.prototype._call = function (context) {
	if (typeof this !== 'function') {
		console.error('TypeError');
	}
	let args = [...arguments].slice(1),
		res = null;
	context = context || window;
	context.fn = this;
	res = context.fn(...args);
	delete context.fn;
	return res;
};

//test

global.name = 1;
const a = function () {
	console.log(this.name);
};
a(); //1

const A = { name: 2333 };
a._call(A); //2333
window.name = 999;
a._call(); //999
/* 
more: 
要注意的是，
箭头函数的this在定义时就已经定下来了噢
call这些方法是无法修改他的this的
*/
