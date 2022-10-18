/**快排
 * 选择一个基准值（pivot），
 *        要记得取基准值的时候，要把它从原数组中拿出来，不然会永远递归下去
 *         然后后面遍历的时候，也就是只遍历 len - 1个
 * 以基准值将数组分割为两部分
 * 递归分割之后的数组直到数组为空或只有一个元素为止
 *
 */

const quickSort = arr => {
	const len = arr.length;
	if (arr === null || len <= 1) return arr;
	const pivotIdx = Math.floor(len / 2);
	const pivot = arr.splice(pivotIdx, 1)[0];
	const l = [],
		r = [];
	for (let i = 0; i < len - 1; i++) {
		if (arr[i] < pivot) l.push(arr[i]);
		else r.push(arr[i]);
	}
	// return quickSort(l).concat([pivot], quickSort(r));
	return [...quickSort(l), pivot, ...quickSort(r)];
};

//test
console.log(quickSort([101, 2, 9, 1, -9]));
