/* 
函数防抖就是 事件触发 n 秒后再进行回调
触发 n 秒内再次触发就删除原先的定时器，重新设置一个
常用场景：
- 避免用户多次点击发送多次请求
- 监听搜索框
- 监听屏幕滚动
*/
/**
 * 防抖
 * @param {function} fn 待防抖处理的函数
 * @param {number} delay 延迟秒数
 * @returns {function} 防抖的函数
 */
const debounce = (fn, delay = 1000) => {
	//定时器 id
	let timer = null;

	return function () {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments);
		}, delay);
	};
};

//test
const test = () => void console.log('test');
const debouncedTest = debounce(test);
debouncedTest(11, 11); //这里会触发
//中间这三个不会触发
debouncedTest(11, 11);
debouncedTest(11, 11);
debouncedTest(11, 11);

setTimeout(() => {
	debouncedTest(11, 11);
}, 2000); //这里会触发
