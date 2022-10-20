/* 手写 redux-thunk 
从他的下载量、使用量来说，核心代码是你想象不到的短
*/
/**
 *
 * @param {*} extraArument
 * @returns
 */
function createThunkMiddleware(extraArument) {
	function middleware({ getState, dispatch }) {
		return function (next) {
			return function (action) {
				//如果 action 是函数，就传入 dispatch 和 getSate 作为参数执行
				if (typeof action === 'function') {
					return action(dispatch, getState, extraArument);
				}
				//否则传给下一个中间件
				return next(action);
			};
		};
	}
	return middleware;
}

const thunk = createThunkMiddleware();
