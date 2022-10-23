/* 深比较 */
function deepEqual(x, y) {
	if (x === y) return true;
	else if (typeof x === 'object' && typeof y === 'object') {
		if (x === null || y === null) return false;
		const keyX = Object.keys(x);
		const keyY = Object.keys(y);
		if (keyX.length !== keyY.length) return false;
		for (const key of keyX) {
			if (!deepEqual(x[key], y[key])) return false;
		}
		return true;
	} else return false;
}

const a = { aa: [1, 2, 3] };
const b = { aa: [1, 2, 3] };
const c = { aa: [1, 3, 3], c: a };
const d = { aa: [1, 3, 3], c: a };
console.log(deepEqual(a, b)); //true
console.log(deepEqual(a, c)); //false
console.log(deepEqual(c, d)); //true
