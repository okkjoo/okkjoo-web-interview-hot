/*
 * @lc app=leetcode.cn id=811 lang=javascript
 *
 * [811] 子域名访问计数
 */

// @lc code=start
/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function (cpdomains) {
	const mp = {};
	for (let s of cpdomains) {
		const cnt = parseInt(s.split(' ')[0]);
		const domain = s.split(' ')[1];
		const ds = domain.split('.').reverse();
		let pre;
		for (const c of ds) {
			const key = `${c}${pre ? `.${pre}` : ''}`;
			mp[key] = (mp[key] || 0) + cnt;
			pre = key;
		}
	}
	// console.log(mp);
	const ans = [];
	for (const k in mp) ans.push(mp[k] + ' ' + k);
	// console.log(ans);
	return ans;
};
// @lc code=end

// subdomainVisits([
// 	'900 google.mail.com',
// 	'50 yahoo.com',
// 	'1 intel.mail.com',
// 	'5 wiki.org',
// ]);
