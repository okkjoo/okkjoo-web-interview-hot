/**
 * 冒泡排序
 * @param {Array} arr
 * @returns 有序的数组
 */
function bubbleSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let flag = true;
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				flag = false;
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
		if (flag) break; // 某次循环未交换元素说明有序了
	}
	return arr;
}

//test
const a = [1, 3, 4, 2, 1, 0, 9];
console.log(bubbleSort(a));
//[0, 1, 1, 2, 3, 4, 9]
