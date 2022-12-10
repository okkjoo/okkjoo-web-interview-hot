/* 检验密码强度
密码要求： 6-12 位，有大小字母、数字、特殊符号如 $@_.
知识点：
正则表达式前瞻语法 ?=xx[a]  —— 简单来说就是 提前先往后看看xx的后面有没有 a，并没有真正匹配掉
*/
function checkPassword(password) {
	if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[$@_.])^[a-zA-Z\d$@_.]{6,12}$/.test(password))
		return true;
	return false;
}

console.log(checkPassword('12345')); //false
console.log(checkPassword('12333a')); //false
console.log(checkPassword('12223aA')); //false
console.log(checkPassword('12@3a2A')); //true
console.log(checkPassword('12@3a2A1111111111111')); //false
