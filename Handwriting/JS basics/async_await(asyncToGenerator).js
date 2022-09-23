// 用于测试
const getData = id =>
	new Promise(resolve =>
		setTimeout(() => {
			resolve(id);
		}, 500)
	);
/* 标标准准 async await 使用*/
async function test() {
	const res = await getData(1);
	console.log('res:', res);
	const res2 = await getData(2);
	console.log('res2:', res2);
	return 3;
}
// test().then(res => console.log(res));
//res: 1
//res: 2
//3

/* 
------------------------
await 编译为 yield 
async 声明 编译为 generator 函数
*/

/* 
async 是 generator 语法糖
关键在于 generator 函数，怎么自动执行
即自动调用它本身的 next() 方法
*/
// 上面的 test 代码编译为 generator 函数大概是这样
function* testG() {
	const res = yield getData(1); //await 编译为 yield
	console.log('res:', res);
	const res2 = yield getData(2);
	console.log('res2:', res2);
	return 3;
}
/* 
const gen = testG(); // 调用 generator 返回一个迭代器
const dataPromise = gen.next(); // 第一次调用停在第一个 yield 的地方，返回一个 value 为 Promise 的迭代器
console.log(dataPromise); //value: Promise { <pending> }, done: false }
//第二次调用 next 的时候，data 的值会变，但是是变成 传入 next 的值
gen.next(222); //res: 222
 */

/* 
之后往下也是一样的流程
那么我们要保证 data 拿到正确的值的话
就要将正确的值传入下一个 next 中
结合刚才 value 为 Promise 的迭代器
可以调用 Promise 的 then 将值传入 next

最终效果：
const test = asyncToGenerator(
  function* testG(){}{}
)
test().then()
*/
/**
 *  babel 编译 async (easy 版)
 * @param {Generator} generatorFn 迭代器函数
 * @returns {Function<Promise>} 返回一个函数
 */
function asyncToGenerator(generatorFn) {
	/* 返回一个函数 */
	return function () {
		// 用传入的 generator 函数生成一个迭代器
		const gen = generatorFn.apply(this, arguments);
		/* 返回一个 promise 
    因为外部调用时， 是这样使用该 async 函数返回值的
    - test().then
    - await test()
    */
		return new Promise((resolve, reject) => {
			/**
			 * 内部 step 方法，用于"自动"执行 next()||throw() 跨过 yield
			 * @param {string} key 'next' || 'throw' 对应迭代器 gen 的两个方法
			 * @param {any} arg 用来把 上一个  promise resolve 出来的值交给下一个 yield
			 * @returns {promise}
			 */
			function step(key, arg) {
				let generatorRes;
				try {
					generatorRes = gen[key](arg); //调用 gen 的 next 或者 throw 方法，传入 promise resolve 出来的值
				} catch (error) {
					reject(error); //出错了 promise reject 报错，外部可以通过 .catch 获取错误
				}
				const { value, done } = generatorRes;
				if (done) {
					//done === true 即已经执行完最后一个 next() 了， 就直接 resolve 掉返回的这个 promise
					// 本测试案例最后一个 next() 返回的就是 {value:3, done: true}，最后返回值就是 3
					return resolve(value);
				} else {
					// 除了最后一次，前面 next() 返回的就是 {value: promise, done: false}
					return Promise.resolve(value).then(
						// 注意这里传入的 value 就是一个 yield 后面的 promise
						val => step('next', val), // value 这个 promise resolve 的时候就执行 next()
						err => step('throw', err) //处理错误
					);
				}
			}
			step('next');
		});
	};
}
/*
运行起来效果就像这样一层一层递归进去
    gen.next().value.then(value => {
      gen.next(value).value.then(value2 => {
        gen.next() 
  
        // 最后一个 next 之后 done 为 true了，就将外层返回的 promise resolve
        // 最外部的test().then(res => console.log(res))的then就开始执行了
      })
    })
 */
const testGAsync = asyncToGenerator(testG);
testGAsync().then(res => void console.log(res));
//res: 1
//res: 2
//3
