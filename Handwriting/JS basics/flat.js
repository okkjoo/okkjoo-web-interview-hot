Array.prototype._flat = function () {
	const arr = this;
	return arr.reduce((a, b) => a.concat(b), []);
};

console.log(
	[
		[1, 2, [3, 4], 44],
		[1221, 2],
	]._flat()
); //[ 1, 2, [ 3, 4 ], 44, 1221, 2 ]

console.log(
	[
		[1, 2, [3, 4], 44],
		[1221, 2],
	].flat()
); //[ 1, 2, [ 3, 4 ], 44, 1221, 2 ]
