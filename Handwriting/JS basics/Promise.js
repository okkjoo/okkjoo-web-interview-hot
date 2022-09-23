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
			self.error = error;
			self.onRejectedCallbacks.forEach(callback => void callback(error));
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
 * @returns {Promise}返回一个新的 Promise 实例
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
	const self = this;
	return new MyPromise((resolve, reject) => {
		let fulfilled = () => {
			try {
				const result = onFulfilled(self.value);
				return result instanceof MyPromise
					? result.then(resolve, reject)
					: resolve(result);
			} catch (e) {
				reject(e);
			}
		};
		let rejected = () => {
			try {
				const result = onRejected(self.error);
				return result instanceof MyPromise
					? result.then(resolve, reject)
					: reject(result);
			} catch (e) {
				reject(e);
			}
		};

		switch (self.status) {
			case PENDING:
				self.onFulfilledCallbacks.push(fulfilled);
				self.onRejectedCallbacks.push(rejected);
				break;
			case FULFILLED:
				fulfilled();
				break;
			case REJECTED:
				rejected();
				break;
		}
	});
};

/**
 * catch 方法 其实就是 then 的语法糖
 * @param {function} onRejected 处理错误
 * @returns {Promise}
 */
MyPromise.prototype.catch = function (onRejected) {
	return this.then(null, onRejected);
};

/* test */
let f = a => {
	return new MyPromise((resolve, reject) => {
		resolve(a);
	});
};

const t = f(1)
	.then(v => {
		console.log(v); //1
		return f(2);
	})
	.then(v => {
		console.log(v); //2
		return 9;
	})
	.then(v => {
		console.log(v); //9
		throw new Error('ee');
	})
	.catch(e => console.log(e)); //[Error: ee]
