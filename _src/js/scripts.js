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
	user: {
		name: '',
		surname: '',
		preferred_lang: '' // default value
	},
	init(){
		this.setBtnText();
		
		this.bindInputs();
	},
	setBtnText(){
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
	bindInputs(){
		// constant 'inputs' includes the select
		const inputs = document.querySelectorAll('form > .my_data');
		inputs.forEach(el => {
			el.addEventListener('change', (e) => {
				const obj = e.target;
				this.user[obj.id] = obj.value;
			})
		})
	},
	submitForm(e){
		e.preventDefault();
		if(this.user.preferred_lang === ''){
			return false;
		}
		this.successMsg('');
		this.ajax.post({
			action: 'submitForm',
			data: {
				user: this.user
			}
		}, (response) => {
			if(response.result === 'OK'){
				this.successMsg(`<div class="alert-success">${response.message}</div>`);
				document.getElementById('my-form').reset();
			}
			else{
				alert(response.message);
			}
		})
	},
	successMsg(str){
		document.getElementById('success-msg').innerHTML = str;
	},
	reloadTiles(){
		this.ajax.post({
			action: 'reloadTiles',
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
