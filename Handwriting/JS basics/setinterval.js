/* settimeout 模拟实现 setinterval(带清除定时器的版本) */
function mySetinterval(fn, t) {
	let timer = null;
	function interval() {
		fn();
		timer = setTimeout(interval, t);
	}
	interval();
	return {
		cancel: () => clearTimeout(timer),
	};
}

//test
let a = mySetinterval(() => {
	console.log(111); //111一次
}, 1000);
a.cancel();

/* 扩充：setinterval 的缺陷是什么？
1. 代码报错不会停止，不停调用执行
2. 无视网络延迟，如轮询服务器时，可能导致请求堆积
3. 不精确，如果调用的代码执行时间小于定时时间，它会直接跳过调用 —

解决方法就是用 settimeout 实现 setinterval
*/
