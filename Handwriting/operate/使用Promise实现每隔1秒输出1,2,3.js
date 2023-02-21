/* 使用Promise实现每隔1秒输出1,2,3  
from https://juejin.cn/post/6844904077537574919#heading-48
也就是考察如何让异步操作顺序执行
*/
const arr = [1, 2, 3];

arr.reduce(
	(p, x) => {
		//then 里面传一个函数 —— 等里面的 resolve 执行后才掉用下一个
		return p.then(() => {
			return new Promise(resolve => {
				setTimeout(() => {
					console.log(x);
					resolve();
					//resolve(console.log(x)) //一样的
				}, 1000);
			});
		});
	},
	Promise.resolve() //这里包一下第一个
);

//不用 reduce 的话 效果大概就是这样：
/* 
Promise.resolve()
  .then(() => {
    return new Promise(r => {
      setTimeout(() => {
        r(console.log(1))
      }, 1000)
    })
  })
  .then(r => {
    return new Promise(r => {
      setTimeout(() => {
        r(console.log(2))
      }, 1000)
    })
  })
  .then(r => {
    return new Promise(r => {
      setTimeout(() => {
        r(console.log(3))
      }, 1000)
    })
  })
	
*/
