/**
 * 从数组中随机取出一项
 * @param arr 数组
 * @returns 数组中随机一个数字
 */
const sample = (arr: Array<any>) => arr[Math.floor(Math.random() * arr.length)];

//test
const a = [1, 2, 3, 4, 5];
console.log(sample(a));
console.log(sample(a));
console.log(sample(a));
console.log(sample(a));
console.log(sample(a));
