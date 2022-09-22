/* 
Promise 实现
Promise A+ 规定回调为微任务，这里用 setTimeout 模拟
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
		if (value instanceof MyPromise) {
			return value.then(resolve, reject);
		}

		setTimeout(() => {
			if (self.status !== PENDING) return;
			self.status = FULFILLED;
			self.value = value;
			self.onFulfilledCallbacks.forEach(callback => void callback(value));
		}, 0);
	};

	const reject = error => {
		setTimeout(() => {
			if (self.status !== PENDING) return;
			self.status = REJECTED;
			self.value = value;
			self.onRejectedCallbacks.forEach(callback => void callback(value));
		}, 0);
	};
	try {
		executor(resolve, reject);
	} catch (e) {
		reject(e);
	}
}

/**
 * then
 * @param {function} onFulfilled 返回成功结果时的处理函数
 * @param {function} onRejected 返回失败结果时的处理函数
 * @returns
 */
MyPromise.prototype.then = function (onFulfilled, onRejected) {
	onFulfilled =
		typeof onFulfilled === 'function' ? onFulfilled : value => value;
	onRejected =
		typeof onRejected === 'function'
			? onRejected
			: error => {
					throw error;
			  };

	if (this.status === PENDING) {
		this.onFulfilledCallbacks.push(onFulfilled);
		this.onRejectedCallbacks.push(onRejected);
	} else if (this.status === FULFILLED) {
		onFulfilled(this.value);
	} else {
		onRejected(this.value);
	}
};

/* test */
let f = a => {
	return new MyPromise((resolve, reject) => {
		resolve(a);
	});
};

f(1).then(v => {
	console.log(v); //1
	return f(2);
});
