/* 实现 Array.prototype.reduce */
Array.prototype._reduce = function (fn, ...init) {
	let next = init.length ? init[0] : this[0];
	for (let i = init.length ? 0 : 1; i < this.length; i++) {
		next = fn(next, this[i], i);
	}
	return next;
};

//test
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]._reduce((x, y) => x + y, 0)); //55
console.log(
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]._reduce((acc, x, idx) => {
		acc[idx] = x;
		return acc;
	}, {})
); //{ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10 }
