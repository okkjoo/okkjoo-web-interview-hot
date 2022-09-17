/* 懒计算的函数，使用 sum 收集所有累加项，使用 valueOf 进行计算 
效果：sum(1)(2, 3)(4)(5)(6).valueOf(); // 21
疑问：这应该也算柯里化吧？
*/
const sum = (...args) => {
	// 返回一个 function 可以接收参数，并拼接参数进 args 中
	const f = (...rest) => sum(...args, ...rest);
	// 触发 valueof 时开始累加
	f.valueOf = () => args.reduce((x, y) => x + y, 0);
	return f;
};

//test
const clog = v => void console.log(v);
clog(sum(1, 2, 3).valueOf()); //6
clog(sum(2, 3)(2).valueOf()); //7
clog(sum(1)(2)(3)(4).valueOf()); //10
clog(sum(2)(4, 1)(2).valueOf()); //9
clog(sum(1)(2)(3)(4)(5)(6).valueOf()); // 21
clog(sum(10) * sum(10)); //100
