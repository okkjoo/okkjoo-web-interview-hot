/* 用于测试的中间件函数 
中间件的写法是三层函数，个人感觉还是挺绕的
*/
function logger1({ getState }) {
	return function (next) {
		return function (action) {
			console.log('logger1: will dispatch1 next:', next);
			console.log('logger1: action:', action);
			const returnValue = next(action);
			console.log('logger1: state after dispatch1:', getState());
			return returnValue;
		};
	};
}

function logger2({ getState }) {
	return function (next) {
		return function (action) {
			console.log('logger2: will dispatch2 next:', next);
			console.log('logger2: action:', action);
			const returnValue = next(action);
			console.log('logger2: state after dispatch2:', getState());
			return returnValue;
		};
	};
}

//一些地方是箭头函数写法，怕大家看得绕，可以结合上面的 function 写法
const logger3 =
	({ getState }) =>
	next =>
	action => {
		console.log('logger3: will dispatch3 next:', next);
		console.log('logger3: action:', action);
		const returnValue = next(action);
		console.log('logger3: state after dispatch3:', getState());
		return returnValue;
	};
