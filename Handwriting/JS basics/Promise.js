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
	self.onFulfilled = null;
	self.onFulfilled = null;

	const resolve = value => {
		if (self.status !== PENDING) return;
		setTimeout(() => {
			self.status = FULFILLED;
			self.value = value;
			self.onFulfilled(self.value);
		});
	};

	const reject = error => {
		if (self.status !== PENDING) return;
		setTimeout(() => {
			self.status = REJECTED;
			self.error = error;
			self.onRejected(self.error);
		});
	};

	executor(resolve, reject);
}

/* then */
MyPromise.prototype.then = function (onFulfilled, onRejected) {
	if (this.status === PENDING) {
		this.onFulfilled = onFulfilled;
		this.onRejected = onRejected;
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

p.then(v => console.log(v));
