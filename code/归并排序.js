/**
 * 将两个已排好序的子数组合并为一个
 * @param {number[]} left 排好序的数组 left
 * @param {number[]} right 排好序的数组 right
 */
function merge(left, right) {
	const arr = [];
	// 任一子数组为空就退出循环
	let i = 0,
		j = 0;
	for (; i < left.length, j < right.length; ) {
		if (left[i] < right[j]) arr.push(left[i++]);
		else arr.push(right[j++]);
	}
	// 确保剩余的也会加进去
	return [...arr, ...left.slice(i), ...right.slice(j)];
}

/**
 * 归并排序
 * @param {number[]} array 待排序数组
 */
function mergeSort(array) {
	// 持续分割数组，直到每个子数组只包含一个元素
	const mid = Math.floor(array.length / 2);
	if (array.length < 2) return array;
	const left = array.splice(0, mid);
	return merge(mergeSort(left), mergeSort(array));
}

//test
const a = [4, 7, 3, 2, 11, 99, 32];
console.log(mergeSort(a)); //[ 2, 3, 4, 7, 11, 32, 99]
