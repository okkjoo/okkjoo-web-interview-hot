class Subject {
	constructor() {
		this.observers = [];
	}

	add(observer) {
		this.observers.push(observer);
	}

	notify() {
		this.observers.map(observer => {
			observer?.callback();
		});
	}
	remove(observer) {
		this.observers = this.observers.filter(o => o !== observer);
	}
}
class Observer {
	constructor(id) {
		this.id = id;
	}

	callback() {
		console.log('id:', this.id);
	}
}

const subject = new Subject();

const o1 = new Observer(1);
const o2 = new Observer(2);

subject.add(o1);
subject.add(o2);

subject.notify(); //id:1 id:2

subject.remove(o1);

subject.notify(); //id:2
