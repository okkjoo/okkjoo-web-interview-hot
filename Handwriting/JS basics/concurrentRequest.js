/**
 * 对异步请求并发限制
 * @param {any[]} list 待处理数组
 * @param {function} fn 处理操作
 * @param {number} limit 并发限制数量
 * @returns 处理结果
 */
function concurrentRequest(list, fn, limit) {
	return new Promise(resolve => {
		let curIdx = 0;
		let resolvedCnt = 0;
		const result = [];
		const len = list.length;
		function next() {
			const index = curIdx++;
			Promise.resolve(list[index])
				.then(v => fn(v))
				.then(v => {
					result[index] = v;
					resolvedCnt++;
					if (resolvedCnt === len) {
						resolve(result);
					}
					if (curIdx < len) next();
				});
		}
		for (let i = 0; i < len && i < limit; i++) {
			next();
		}
	});
}

// test
const delay = (fn, seconds, ...args) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			Promise.resolve(fn(...args))
				.then(resolve)
				.catch(reject);
		}, seconds);
	});
};
concurrentRequest(
	[1, 1, 1, 1, 1],
	x => delay(() => console.log(new Date().getTime()), 1000),
	2
);
// 注意输出时间，两个一组，每组隔大约 1000 ms
/* 
1670061375602

1670061375603

1670061376619

1670061376620

1670061377634

*/
