/* 题目： */
/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法
  
  add 函数已实现，模拟异步请求后端返回一个相加后的值
*/
function add(a, b) {
	return Promise.resolve(a + b);
}

// TODO
/* version 1 */
/* 
直接 reduce + Promise.resolve(x).then((x)=> add(x, y)) 或者 for + await add()累加行不行，行。 
但是异步OI， 不优化不行， 一个异步 add 延迟 1s， 调用 n 次 add... 所以 O(N) 复杂度需要优化
*/
/* 
// reduce + Promise.resolve(x).then((x)=> add(x, y))
function sum(arr) {
	if (arr.length === 1) return arr[0];
	return arr.reduce((x, y) => Promise.resolve(x).then(x => add(x, y)));
} */

/* 
// for + await add()
async function sum(arr) {
  let s = arr[0];
  for (let i = 1; i < arr.length; i++) {
    s = await add(s, arr[i]);
  }
  return s;
}
*/

/* version 2 */
/*
如何优化？ 二分
将数组两两分组，并行计算两个 —— 时间复杂度将为 O(logn)
*/

/**
 * chunk 将数组分块，之前也写过 在本仓库 chunk.ts 有 ts 版本
 * @param {array} arr 数组
 * @param {number} size 分块大小
 * @returns 分块数组
 */
function chunk(arr, size) {
	const res = [];
	for (let i = 0; i < arr.length; i++) {
		const idx = Math.floor(i / size);
		res[idx] ??= [];
		res[idx].push(arr[i]);
	}
	return res;
}

/* async function sum(arr) {
	if (arr.length === 1) return arr[0]; //剩一个就直接返回
	const promises = chunk(arr, 2).map(([a, b]) =>
		b === undefined ? a : add(a, b)
	);
	// 递归调用 sum
	return Promise.all(promises).then(values => sum(values));
} */

/* version 3 */
/* 
进一步要求， 当请求数量过大，如两亿个数据，那 Promise.all 就会有一亿个数据同时发送
想要控制并发
*/
/**
 * 对异步请求并发限制，之前也写过
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

async function sum(arr) {
	if (arr.length === 1) return arr[0]; //剩一个就直接返回
	return concurrentRequest(
		chunk(arr, 2), //两两一组
		([a, b]) => (b === undefined ? a : add(a, b)), // 每组计算， 注意只剩一个的情况
		10 //每次十个并发
	).then(arr => sum(arr)); //递归调用
}

/*  捋一下关键
1. Promise、await 的基操
2. 二分思想 —— chunk
3. 并发控制 —— concurrentRequest
*/
