/* 实现mergePromise函数，
把传进去的数组按顺序先后执行，
并且把返回的数据先后放到数组data中 */

/* 
有点像是 all 方法，不过多管了一下执行顺序，
也就是必须前面执行好了才下一个
*/
const time = timer => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, timer);
	});
};
const ajax1 = () =>
	time(2000).then(() => {
		console.log(1);
		return 1;
	});
const ajax2 = () =>
	time(1000).then(() => {
		console.log(2);
		return 2;
	});
const ajax3 = () =>
	time(1000).then(() => {
		console.log(3);
		return 3;
	});

function mergePromise(ajaxArr) {
	// 在这里写代码
	// 存放每个 Promise 结果
	const data = [];
	let promise = Promise.resolve();
	ajaxArr.forEach(ajax => {
		promise = promise.then(ajax).then(res => {
			data.push(res);
			return data;
		});
	});
	return promise;
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
	console.log('done');
	console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
