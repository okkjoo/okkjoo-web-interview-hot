/*
 * 协议部分http(s)://        ((https|http|ftp|rtsp|mms)?:\/\/)
 * 域名部分 xxx-xx.xx.          (([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+
 * 顶级域名com cn等为2-6位   ([a-zA-Z]{2,6})
 * 端口部分 :8080            (:\d+)?, ?表示0次或1次
 * 请求路径 /index           (\/.*)?
 * 问号传参 ?id=1            (\?.*)?
 * 哈希值                   (#.*)?
 */
/**
 * 检验 URL 是否合法
 * @param s 待检验的字符串
 * @returns 返回其是否为合法的 URL
 */
const isURL = (s: string) => {
	let reg =
		/^((https|http|ftp|rtsp|mms):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]{2,6})(:\d+)?(\/.*)?(\?.*)?(#.*)?$/;
	return reg.test(s);
};

//test
console.log(
	isURL(
		'https://regex-vis.com/?r=%2F%5E%28%28https%7Chttp%7Cftp%7Crtsp%7Cmms%29%3F%3A%5C%2F%5C%2F%29%28%28%5BA-Za-z0-9%5D%2B-%5BA-Za-z0-9%5D%2B%7C%5BA-Za-z0-9%5D%2B%29%5C.%29%2B%28%5BA-Za-z%5D%7B2%2C6%7D%29%28%3A%5Cd%2B%29%3F%28%5C%2F.*%29%3F%28%5C%3F.*%29%3F%28%23.*%29%3F%24%2F'
	)
);
