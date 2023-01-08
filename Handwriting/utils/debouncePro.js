/* 防抖的缺陷：用户操作一直很频繁时
回调函数就会被一直延迟 —— 效果也会让人感觉无响应
所以 我们需要一个强化版 —— 过了一个时间 delay，必须执行一次
也就是节流防抖组合技
*/
function debouncePro(fn, delay) {
	let last = 0; //上一次触发的时间
	let timer;
	return function () {
		const context = this;
		const args = arguments;
		const now = +new Date();
		if (now - last < delay) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				last = now;
				fn.apply(context, args);
			}, delay);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}
