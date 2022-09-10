/* 
throttle 节流
就是规定一个单位时间内，只能触发一次
即使触发多次，也只执行一次
可用于 scroll 监听
降低事件调用的频率
*/
/**
 * throttle
 * @param {function} fn
 * @param {number} delay
 * @returns function
 */
const throttle = (fn, delay) => {
	let curTime = new Date();

	return (...args) => {
		let nowTime = new Date();

		if (nowTime - curTime >= delay) {
			curTime = new Date();
			return fn.apply(this, args);
		}
	};
};

//test
const test = id => void console.log('test' + id);
const testThrorrle = throttle(test, 200);

// setInterval(() => void testThrorrle(), 100);
testThrorrle();
setTimeout(() => void testThrorrle(1), 100);
setTimeout(() => void testThrorrle(2), 200); //test2
setTimeout(() => void testThrorrle(3), 300);
setTimeout(() => void testThrorrle(4), 400); //test4
setTimeout(() => void testThrorrle(5), 500);
setTimeout(() => void testThrorrle(6), 600); //test6
