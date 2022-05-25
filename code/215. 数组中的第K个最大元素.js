/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 小顶堆
 */
class MinHeap {
	constructor() {
		this.heap = [];
	}
	swap(i1, i2) {
		[this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
	}
	getParentIndex(i) {
		return (i - 1) >> 1;
	}
	getleftIndex(i) {
		return 2 * i + 1;
	}
	getrightIndex(i) {
		return 2 * i + 2;
	}
	shiftUp(index) {
		if (index === 0) return;
		const parentIndex = this.getParentIndex(index);
		if (this.heap[parentIndex] > this.heap[index]) {
			this.swap(parentIndex, index);
			this.shiftUp(parentIndex);
		}
	}
	shiftDown(index) {
		const leftIndex = this.getleftIndex(index);
		const rightIndex = this.getrightIndex(index);
		if (this.heap[leftIndex] < this.heap[index]) {
			this.swap(leftIndex, index);
			this.shiftDown(leftIndex);
		}
		if (this.heap[rightIndex] < this.heap[index]) {
			this.swap(rightIndex, index);
			this.shiftDown(rightIndex);
		}
	}
	insert(value) {
		this.heap.push(value);
		this.shiftUp(this.heap.length - 1);
	}
	pop() {
		// pop删除数组最后一个元素并返回，赋值给堆顶
		this.heap[0] = this.heap.pop();
		// 对堆顶重新排序
		this.shiftDown(0);
	}
	peek() {
		return this.heap[0];
	}
	size() {
		return this.heap.length;
	}
}

const findKthLargest = (nums, k) => {
	const minHeap = new MinHeap();
	nums.forEach(n => {
		// 将数组元素依次插入堆中
		minHeap.insert(n);
		// 如果堆大小超过k，将堆顶(最小) 的去掉
		if (minHeap.size() > k) {
			minHeap.pop();
		}
	});
	// 返回堆顶，此时就是第k大的元素
	return minHeap.peek();
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 快速选择
 */
const findKthLargest = (nums, k) => {
	const n = nums.length;

	const quick = (l, r) => {
		if (l > r) return; //递归终止条件
		let random = Math.floor(Math.random() * (r - l + 1)) + l; //随机选一个索引
		swap(nums, random, r); //将它和位置r的元素交换，让nums[r]作为基准元素

		//对基准元素进行partition
		let pivotIndex = partition(nums, l, r);
		/*
        partition之后，基准左边的都小于它 右边的都大于它
        基准元素的位置pivotIndex正好是n-k 则找大了第k大的数
        如果n-k<pivotIndex,说明偏大了，去pivotIndex的左边递归查找
        如果n-k>pivotIndex，说明偏小了，去pivotIndex的右边递归查找
      */
		if (n - k < pivotIndex) {
			quick(l, pivotIndex - 1);
		} else {
			quick(pivotIndex + 1, r);
		}
	};

	quick(0, n - 1); //函数开始传入的left=0，right= n - 1
	return nums[n - k]; //最后找到了正确的位置 也就是n-k等于pivotIndex 这个位置的元素就是第k大的数
};

function partition(nums, left, right) {
	let pivot = nums[right]; //最右边的元素为基准
	let pivotIndex = left; //pivotIndex初始化为left
	for (let i = left; i < right; i++) {
		//遍历left到right-1的元素
		if (nums[i] < pivot) {
			//如果当前元素比基准元素小
			swap(nums, i, pivotIndex); //把它交换到pivotIndex的位置
			pivotIndex++; //pivotIndex往前移动一步
		}
	}
	swap(nums, right, pivotIndex); //最后交换pivotIndex和right
	return pivotIndex; //返回pivotIndex
}

function swap(nums, p, q) {
	//交换数组中的两个元素
	const temp = nums[p];
	nums[p] = nums[q];
	nums[q] = temp;
}
