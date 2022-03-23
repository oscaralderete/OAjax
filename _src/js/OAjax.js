/*!
@author: Oscar Alderete <me@oscaralderete.com>
@website: https://oscaralderete.com
@editor: NetBeans IDE v12.5
*/
class OAjax {
	_url = '';

	constructor(url) {
		this._url = url;
	};

	// #call is a private method
	#call(params, callback) {
		// using the JS fetch interface
		fetch(this._url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: params
		})
		.then(response => response.json())
		.then(data => {
			if(typeof callback === 'function'){
				callback(data);
			}
		}).catch(error => {
			console.error('ERROR:', error)
		});
	}

	// as '#call', '#serialize' is a private method too
	#serialize(obj, prefix) {
		/*
		not my code, I found it on:
		https://www.codegrepper.com/code-examples/javascript/javascript+url+encode+object+recursive
		*/
		var str = [],
			p;
		for(p in obj){
			if(obj.hasOwnProperty(p)) {
				var k = prefix ? `${prefix}[${p}]` : p,
					v = obj[p];
				str.push((v !== null && typeof v === 'object') ? this.#serialize(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
			}
		}
		return str.join('&');
	}

	// 'post' is the only accessible method, to keep it as simple as possible
	post(obj, callback) {
		this.#call(this.#serialize(obj), callback);
	}
}

