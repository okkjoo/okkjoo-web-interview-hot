async function loadBig(url) {
	const resp = await fetch(url);
	const reader = resp.body.getReader(); //知识点： 分段获取响应
	while (1) {
		const { value, done } = await reader.read();
		if (done) break;
		const decoder = new TextDecoder(); // 知识点： 处理文本, 别的资源就用别的
		const text = decoder.decode(value);
	}
}

// 效果就是：总时间没变化，但是用户响应速度提高
