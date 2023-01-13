function promiseAllSettled(promises) {
	const onResolved = value => ({ status: 'fulfilled', value });
	const onRejected = error => ({ status: 'rejected', error });
	return Promise.all(
		promises.map(p => Promise.resolve(p).then(onResolved, onRejected))
	);
}

//test
let p1 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		reject(1);
	}, 1000);
});
let p2 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(2);
	}, 2000);
});
let p3 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(3);
	}, 3000);
});

promiseAllSettled([p3, p2, p1])
	.then(res => console.log(res))
	.catch(err => console.log('err:', err));
/* 
[ { status: 'fulfilled', value: 3 },
  { status: 'fulfilled', value: 2 },
  { status: 'rejected', error: 1 } ]
*/
