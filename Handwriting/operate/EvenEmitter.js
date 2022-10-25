/* 实现一个发布订阅模式
三个核心 API + 1 个辅助 :
1. emit 发布一个事件
2. on 监听一个事件
3. off 取消一个事件监听
4. once 监听一个事件，但只监听一次
*/

class EventEmitter {
	constructor() {
		this.events = {};
	}

	emit(type, ...args) {
		const listeners = this.events[type];
		for (const listener of listeners) {
			listener(...args);
		}
	}

	on(type, listener) {
		this.events[type] = this.events[type] || [];
		this.events[type].push(listener);
	}

	off(type, listener) {
		this.events[type] = this.events[type] || [];
		this.events[type] = this.events[type].filter(
			callback => listener !== callback
		);
	}

	once(type, listener) {
		this.events[type] = this.events[type] || [];
		const onceListener = (...args) => {
			this.off(type, onceListener); //*
			listener(...args);
		};
		this.on(type, onceListener);
	}
}

//test
const e = new EventEmitter();
const f = id => void console.log('id:', id);
const oncef = id => void console.log('once id:', id);
e.on('a', f);
e.once('a', oncef);

e.emit('a', { id: 1 }); //id: { id: 1 }  once id: { id: 1 }
e.emit('a', { id: 2 }); //id: { id: 2 }
function test() {
	let sign1 = 0;
	let sign2 = 0;
	const emitter = new EventEmitter();
	emitter.on('add', function () {
		sign1++;
	});
	emitter.emit('add');
	emitter.on('add', function () {
		sign2++;
	});
	emitter.emit('add');
	const judge = sign1 === 2 && sign2 === 1;
	return judge;
}
console.log(test()); //true
