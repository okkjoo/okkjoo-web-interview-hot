const http = require('http'); //https://nodejs.org/api/http.html

/* Application */
module.exports = class Application {
	constructor() {
		this.middlewares = []; //收集中间件回调函数的数组，之后使用 koa-compse 串联
	}
	listen(...args) {
		const server = http.createServer(async (req, res) => {
			const ctx = new Context(req, res);
			// 对中间件回调函数串联，形成洋葱模型
			const fn = compose(this.middlewares); // compose 是重点。返回一个函数，效果是串联
			await fn(ctx);
		});
		server.listen(...args);
	}
	use(middleware) {
		this.middlewares.push(middleware);
	}
};

/**
 * Context 类
 * 以 request, response 来构造 ctx 对象
 */
class Context {
	constructor(req, res) {
		this.req = req;
		this.res = res;
	}
}
/**
 *
 * @param {Array<Function>} middlewares 中间件函数数组
 * @returns 串联后的函数
 */
function compose(middlewares) {
	return ctx => {
		/**
		 * 执行第 i 个 中间件
		 * @param {number} i 中间件数组下标
		 * @returns 中间件函数
		 */
		const dispatch = i => {
			const middleware = middlewares[i];
			if (i === middlewares.length) return; // 搞完全部中间件
			return middleware(ctx, () => dispatch(i + 1)); // 这里调用下一个
		};
		return dispatch(0); // 调用第一个
	};
}
