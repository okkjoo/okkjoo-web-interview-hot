/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存
 */

// @lc code=start
/* class _node {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

class LRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.mp = {};
		this.size = 0;
		this.head = new _node();
		this.tail = new _node();
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	get(key) {
		let node = this.mp[key];
		if (node == null) return -1;
		this.remove(node);
		this.append(node);
		return node.value;
	}

	put(key, value) {
		let node = this.mp[key];
		if (node == null) {
			if (this.size == this.capacity) {
				let tail = this.removeTail();
				delete this.mp[tail.key];
				this.size--;
			}
			let newNode = new _node(key, value);
			this.mp[key] = newNode;
			this.append(newNode);
			this.size++;
		} else {
			node.value = value;
			this.remove(node);
			this.append(node);
		}
	}

	remove(node) {
		let pre = node.prev;
		let nxt = node.next;
		pre.next = nxt;
		nxt.prev = pre;
	}
	//默认就加到队头
	append(node) {
		node.prev = this.head;
		node.next = this.head.next;
		this.head.next.prev = node;
		this.head.next = node;
	}

	removeTail() {
		let tail = this.tail.prev;
		this.remove(tail);
		return tail;
	}
} */

/* 借助 JavaScript 的 Map 特性完成 */
class LRUCache {
	constructor(limit) {
		this.limit = limit;
		this.cache = new Map();
	}

	get(key) {
		if (!this.cache.has(key)) return -1;
		const val = this.cache.get(key);
		this.cache.delete(key);
		this.cache.set(key, val);
		return val;
	}

	put(key, val) {
		if (this.cache.has(key)) this.cache.delete(key);
		else if (this.cache.size >= this.limit) {
			/*  注意这里 keys() 返回一个 MapIterator 
			其中 next() 方法 调用第一次时返回的 value 
			就是 cache 的第一对键值对的 key
			*/
			this.cache.delete(this.cache.keys().next().value);
		}
		this.cache.set(key, val);
	}
}
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
