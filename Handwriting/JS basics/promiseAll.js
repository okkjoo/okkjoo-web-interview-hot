/* 
1. 接收的参数是 Array<promise>
2. 返回一个 promise
3. 参数所有回调成功才是成功，返回值数组与参数顺序一致
4. 如果失败：第一个触发失败的 promise 错误信息作为 all 的返回信息
*/

function promiseAll(promises) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(promises)) {
			throw new TypeError('argument must be a array');
		}

		let resolvedCount = 0;
		const pNum = promises.length;
		const resolvedRes = [];

		promises.forEach((p, i) => {
			Promise.resolve(p)
				.then(val => {
					resolvedCount++;
					// resolvedRes.push(val);
					resolvedRes[i] = val; //注意要用下标访问而不是 push 不然顺序不一定按照传参进来的顺序
					if (resolvedCount === pNum) return resolve(resolvedRes);
				})
				.catch(err => reject(err));
		});
	});
}

// test
let p1 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(1);
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
promiseAll([p3, p1, p2]).then(res => {
	console.log(res); // [3, 1, 2]
});
