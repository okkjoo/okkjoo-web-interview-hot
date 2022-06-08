/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存
 */

// @lc code=start
class _node {
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
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
