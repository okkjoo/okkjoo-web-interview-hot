/*
 * @lc app=leetcode.cn id=155 lang=javascript
 *
 * [155] 最小栈
 */

// @lc code=start

var MinStack = function () {
	this.stack = [];
	this.minStk = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
	this.stack.push(val);
	if (this.minStk.length === 0 || val <= this.minStk[this.minStk.length - 1]) {
		this.minStk.push(val);
	}
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
	const val = this.stack.pop();
	if (val !== void 0 && val === this.minStk[this.minStk.length - 1]) {
		this.minStk.pop();
	}
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
	return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
	return this.minStk[this.minStk.length - 1];
};
/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end
