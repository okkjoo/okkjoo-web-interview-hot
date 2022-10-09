/**
 * String.prototype.trim 去掉字符串首尾空格
 * @param str 待处理字符串
 * @returns 去掉后首位空格的字符串
 */
const trim = (str: string) => str.replace(/^\s+|\s+$/g, '');

//test
const s = '  asdsa d as   ';
console.log(trim(s)); //'asdsa d as'
