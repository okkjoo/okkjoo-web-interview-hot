//fetch 基础用法
fetch(url, {
	method: 'POST',
	headers: {
		Accept: '*/*',
		'Content-Type': 'application/json;charset=utf-8',
		'access-token': 'token',
	},
})
	.then(res => {
		res.json();
	})
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.log(err.msg);
	});

/* 
封装之后

*/
/**
 * @param {string} url 请求路径
 * @param {string} method 请求方式
 * @param {object} headers 请求头
 * @param {object} body 请求体
 * @return {promise} result 请求结果
 */
const fetchPro = (url, method, header, body) => {
	const defaultHeader = {
		'Content-Type': 'application/json',
	};

	let params;
	if (method.toUpperCase() === 'GET') {
		params = undefined;
	} else {
		params = {
			headers: {
				...defaultHeader,
				header,
			},
			method,
			body: JSON.stringify(body),
		};
	}

	const p = new Promise((resolve, reject) => {
		fetch(url, params)
			.then(res => res.json())
			.then(res => {
				if (res.status === 200) {
					resolve(res);
				} else {
					//做一些错误提示
					//...
					reject(res.errMsg);
				}
			})
			.catch(err => {
				//提示
				reject(err);
			})
			.finally(() => {
				//处理一些东西，比如setLoading(false)
			});
	});
	//如果有超时处理啥的就一起放进去
	return Promise.race([p]);
};

/* 
更多：
关于 react
自定义一个 useHttpHook 
传入  watch 监听项 配合 useEffect 
useState 控制 isLoading
捕获错误进行提示
*/
