let obj = {};
let input = document.getElementById('input');
let p = document.getElementById('p');

//数据劫持
Object.defineProperty(obj, 'text', {
	configurable: true,
	enumerable: true,
	get() {
		console.log('get data');
	},
	set(newVal) {
		console.log('update data');
		//修改 obj 数据时同步修改 input 和 p 内容
		input.value = newVal;
		p.innerHTML = newVal;
	},
});

//监听 input
input.addEventListener('keyup', e => {
	obj.text = e.target.value;
});
