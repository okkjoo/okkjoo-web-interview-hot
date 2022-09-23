/**
 * 休眠sleep方法
 * @param seconds sleep秒数
 * @returns
 */
const sleep = (seconds: number): Promise<void> =>
	new Promise(resolve => setTimeout(resolve, seconds));

//test
const d1 = new Date().getTime();
sleep(2000).then(() => {
	const d2 = new Date().getTime();
	console.log(d2 - d1); //两秒后输出 2000 多一点点
});
