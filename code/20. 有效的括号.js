/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
	const stk = []; //数组模拟栈
	const mp = new Map(); ////对应括号映射
	mp["("] = ")";
	mp["{"] = "}";
	mp["["] = "]";
	for (let c of s) {
		//拿到左括号
		// if(['(','[','{'].indexOf(c) != -1){
		if (c in mp) {
			stk.push(c);
		} else {
			const top = stk.pop();
			if (c !== mp[top]) return false; //栈顶不是对应的左括号或者为undefined
		}
	}
	if (stk.length) return false;
	return true; //一切都恰当
};
