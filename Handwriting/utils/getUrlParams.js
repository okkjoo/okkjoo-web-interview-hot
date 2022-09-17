/**
 * 解析 querystring
 * @param {string} url 待解析的url
 * @returns 解析后的 key value 对象
 */
function getUrlParams(url) {
	const dict = {};
	// 匹配 = 两边的 key value 前面和后面可能有 ? &
	url.replace(/([^?&]*)=([^&]*)/g, (all, key, val) => {
		key = decodeURIComponent(key);
		val = decodeURIComponent(val);
		// key 出现多次就将 value 变为数组
		if (dict[key]) return (dict[key] = [dict[key], val].flat());
		dict[key] = val;
	});
	return dict;
}
console.log(getUrlParams('https://example.com?name=%E5%B7%9E')); //{ name: '州' }
console.log(getUrlParams('http://example.com?tag=test&title=1%2B1%3D2')); //{ tag: 'test', title: '1+1=2' }
console.log(getUrlParams('http://example.com?tag=')); //{ tag: '' }
console.log(getUrlParams('http://example.com?tag=test&title=1+1=2')); //{ tag: 'test', 'title=1+1': '2' }
console.log(getUrlParams('http://example.com?arr=2&arr=1')); //{ arr: [ '2', '1' ] }
