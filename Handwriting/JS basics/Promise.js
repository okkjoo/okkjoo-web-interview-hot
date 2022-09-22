/* 
Promise 实现
*/

/* 三种状态 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/* 构造函数 */
function MyPromise(executor) {
	let self = this; //缓存 promise 实例
	self.value = null;
	self.error = null;
	self.status = PENDING;

	self.onFulfilledCallbacks = [];
	self.onRejectedCallbacks = [];

	const resolve = value => {
		if (self.status !== PENDING) return;
		setTimeout(() => {
			self.status = FULFILLED;
			self.value = value;
			self.onFulfilledCallbacks.forEach(callback => callback(self.value));
		});
	};

	const reject = error => {
		if (self.status !== PENDING) return;
		setTimeout(() => {
			self.status = REJECTED;
			self.error = error;
			self.onRejectedCallbacks.forEach(callback => callback(self.error));
		});
	};

	executor(resolve, reject);
}

/**
 * then
 * @param {function} onFulfilled 返回成功结果时的处理函数
 * @param {function} onRejected 返回失败结果时的处理函数
 * @returns
 */
MyPromise.prototype.then = function (onFulfilled, onRejected) {
	if (this.status === PENDING) {
		this.onFulfilledCallbacks.push(onFulfilled);
		this.onRejectedCallbacks.push(onRejected);
	} else if (this.status === FULFILLED) {
		onFulfilled(this.value);
	} else {
		onRejected(this.error);
	}
	return this;
};

/* test */

const p = new MyPromise(function (resolve, reject) {
	setTimeout(function () {
		resolve(1);
	}, 1000);
});
p.then().then().then();
console.log(p.onFulfilledCallbacks.length); //3
