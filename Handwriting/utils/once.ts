/**
 * 只执行一次并且记忆返回结果
 * @param f 待处理的函数
 * @returns 处理完的函数
 */
function once<T>(f: (...args: any) => T): (...args: any) => T {
	let result: T;
	let revoked: boolean = false;

	return (...args) => {
		if (revoked) return result;
		const r = f(...args);
		revoked = true;
		result = r;
		return result;
	};
}

//test
const test = (a: number) => {
	console.log('a:', a);
	console.log('c');
	return a;
};

const tonce = once(test);

const t1 = tonce(111); // a: 111   c
console.log(t1); // 111
const t2 = tonce(222); // 什么都没输出
console.log(t2); // 111
