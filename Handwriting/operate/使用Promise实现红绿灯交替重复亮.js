/* 使用Promise实现红绿灯交替重复亮
红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；
如何让三个灯不断交替重复亮灯？（用Promise实现）
*/

/* 亮灯函数 */
function red() {
	console.log('red');
}
function green() {
	console.log('green');
}
function yellow() {
	console.log('yellow');
}

/* your code */

/* 思路：
首先不断重复 —— 第一下想到 while
但是用 Promise 的话，也可以用 递归，微任务递归是不会爆栈的
*/
const light = function (timer, cb) {
	return new Promise(resolve => {
		setTimeout(() => {
			cb();
			resolve();
		}, timer);
	});
};

const step = function () {
	Promise.resolve()
		.then(() => {
			return light(3000, red);
		})
		.then(() => {
			return light(2000, green);
		})
		.then(() => {
			return light(1000, yellow);
		})
		.then(() => {
			return step();
		});
};

step();
