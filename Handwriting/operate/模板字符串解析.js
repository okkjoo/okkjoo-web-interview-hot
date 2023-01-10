let template = '我的名字{{name}},身高{{height}},体重{{weight}}';

let data = { name: 'zhou', height: 999, weight: 999 };
function templateRender(template, data) {
	const computed = template.replace(/\{\{(\w+)\}\}/g, function (match, key) {
		return data[key];
	});
	return computed;
}

console.log(templateRender(template, data)); //我的名字zhou,身高999,体重999
