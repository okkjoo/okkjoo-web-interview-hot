/**
 *
 * @param {Array<promise>} promises promise 实例数组
 * @returns
 */
function promiseRace(promises) {
	return new Promise((resolve, reject) => {
		promises.forEach(p => {
			//把 上面的 resolve 注入数组中的每一个 Promise实例中的回调函数
			// 实现 只返回 第一个 Promise 执行完返回的 promise
			p.then(resolve, reject);
		});
	});
}

//test
let p1 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		reject(1);
	}, 1000);
});
let p2 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(2);
	}, 2000);
});
let p3 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(3);
	}, 3000);
});

promiseRace([p3, p2, p1])
	.then(res => console.log(res))
	.catch(err => console.log('err:', err)); //err:1
