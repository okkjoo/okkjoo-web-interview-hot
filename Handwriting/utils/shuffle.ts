/**
 * 数组洗牌函数
 * @param arr 待洗牌的数组
 * @returns 打乱顺序后的数组
 */
const shuffle = (arr: Array<any>) => arr.sort(() => Math.random() - 0.5);

//test
const a = [1, 2, 3, 4, 5];
shuffle(a);
a;

/**
 * 应用：随机生成四位数手机验证码
 */

//四位不重复的验证码
const randomUniqueCode = () =>
	shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
console.log(randomUniqueCode());

/**
 * 返回 0 ~ n 之间随机一个数字
 * @param n
 * @returns 随机数
 */
const random = (n: number) => Math.floor(Math.random() * (n + 1));
//四位可重复的验证码
const randomCode = () => [0, 0, 0, 0].map(() => random(9));
console.log(randomCode());
