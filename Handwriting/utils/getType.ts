/**
 *  判断变量类型
 * @param {any}value 待判断类型的变量
 * @returns {string} 类型字符串
 */
const getType = (value: any): string => {
	// 对象为 null
	if (value === null) {
		return value + '';
	}
	// 对象为引用类型（除函数外
	if (typeof value === 'object') {
		const toString = Object.prototype.toString;
		return toString.call(value).slice(8, -1).toLowerCase();
	} else {
		//为基本类型或者函数
		return typeof value;
	}
};

//test
console.log(getType({})); //object
console.log(getType(() => {})); //function
console.log(getType(new Date())); //date
console.log(getType(1)); //number

export default getType;
