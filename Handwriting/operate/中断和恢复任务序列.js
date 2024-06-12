/**
 * 依次顺序执行一系列任务
 * 所有任务完成之后得到每个任务的执行结果
 * 需要返回两个方法，start 启动任务、pause 暂停任务
 * 每个任务具有原子性，即中断只发生在两个任务间
 * @param  {...Function} tasks  任务列表，每个任务无参数、异步
 */
function processTasks(...tasks) {
	let isRunning = false;
	const result = [];
	let curIdx = 0;
	return {
		async start() {
			isRunning = true;
			while (curIdx < tasks.length) {
				result.push(await tasks[curIdx]());
				curIdx++;
				if (!isRunning) {
					return;
				}
			}
		},
		pause() {
			isRunning = false;
		},
	};
}
