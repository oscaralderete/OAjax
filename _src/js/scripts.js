/*!
@author: Oscar Alderete <me@oscaralderete.com>
@website: https://oscaralderete.com
@editor: NetBeans IDE v12.5
*/
const App = {
	ajax: new OAjax(pageData.url),
	current_lang: 'en',
	btn_text: {
		en: 'Texto en español usando Ajax',
		es: 'Switch to English using Ajax'
	},
	init(){
		this.setBtnText();
	},
	setBtnText(){
		console.log('tracer', this.btn_text[this.current_lang])
		document.getElementById('btn-translate').innerHTML = this.btn_text[this.current_lang];
		
	},
	translate(){
		// set new lang
		const lang = this.current_lang === 'en' ? 'es' : 'en';
		
		// make post call
		this.ajax.post({
			action: 'translateIntroText',
			data: {
				lang: lang
			}
		}, (response) => {
			if(response.result === 'OK'){
				this.current_lang = lang;
				// update button caption
				this.setBtnText();
				// switch the html content
				document.getElementById('text').innerHTML = response.html;
			}
			else{
				alert(response.message)
			}
		});
	},
	reloadTiles(){
		this.ajax.post({
			'action': 'reloadTiles',
			data: {
				tiles: event.target.value
			}
		}, (response) => {
			if(response.result === 'OK'){
				document.getElementById('tiles').innerHTML = response.html;
				// scrool
				document.getElementById('scroll-trigger').click();
			}
			else{
				alert(response.message);
			}
		})
	},
	test(){
		this.ajax.post({
			action: 'test',
			data: {
				name: 'John',
				surname: 'Doe',
				hobbies: ['surfing', 'biking', 'coding', 'reading'],
				other: {
					age: 21,
					genre: 'Male'
				}
			}
		}, (response) => {
			console.log('result:', response)
		})
	}
}

window.onload = (e) => {
	App.init();
}