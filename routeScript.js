/* 
自动收集 leetcode, Handwriting 代码文件放入 目录中
*/
const fs = require('fs');
const path = require('path');

const isFile = fileName => {
	return fs.lstatSync(fileName).isFile();
};

const writeScript = (formFolder, toFile, title) => {
	const find = (folder, depth) => {
		const arr = fs.readdirSync(folder).reduce((a, fileName) => {
			if (!isFile(path.join(folder, fileName))) {
				a = a.concat(`\n${'#'.repeat(depth)} ${fileName}\n`);
				a = a.concat(find(`${path.join(folder, fileName)}`, depth + 1));
				return a;
			}
			a = a.concat(
				`- [${fileName}](./${encodeURIComponent(
					path.join(folder, fileName).replace(/\\/g, '/')
				)})`
			);
			return a;
		}, []);

		return arr;
	};

	const list = find(formFolder, 3);
	const s = `## ${title}\n\nsum: ${list.length}\n\n${list.join('\n')}`;
	fs.writeFileSync(toFile, s, err => {
		if (err) {
			console.error(err);
			return;
		}
	});
};

writeScript('code', 'leetcodeRoute.md', 'leetcode');
writeScript('Handwriting', 'HandwritingRoute.md', 'Handwriting');
