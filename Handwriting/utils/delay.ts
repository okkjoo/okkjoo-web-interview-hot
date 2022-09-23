/**
 * N 毫秒后执行函数
 * @param fn 待执行函数
 * @param seconds 延迟秒数
 * @param args 传入函数的参数
 * @returns 一个 Promise
 */
const delay = (fn: Function, seconds: number, ...args: any): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		setTimeout(() => {
			Promise.resolve(fn(...args))
				.then(resolve)
				.catch(reject);
		}, seconds);
	});
};
//test
const d1 = new Date().getTime();
const a = delay(
	(name: string) => {
		console.log(new Date().getTime() - d1); //一秒后输出 1000 多一点点的值
		return name;
	},
	1000,
	'zhou'
).then(v => console.log(v));
