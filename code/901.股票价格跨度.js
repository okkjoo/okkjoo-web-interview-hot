/*
 * @lc app=leetcode.cn id=901 lang=javascript
 *
 * [901] 股票价格跨度
 */

// @lc code=start

var StockSpanner = function () {
	this.idx = -1;
	this.stk = [[this.idx, Math.pow(10, 5) + 10]];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
	this.idx++;
	while (price >= this.stk[this.stk.length - 1][1]) this.stk.pop();
	this.stk.push([this.idx, price]);
	return this.idx - this.stk[this.stk.length - 2][0];
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
// @lc code=end
