# OAjax
## Make Ajax calls from WordPress without jQuery

This an efficient class to make Ajax calls from the WordPress front-end without use or load jQuery (its last minified version is 88Kb), compare it against the only 3KB of my script.

This class uses JavaScript's fetch() implementation, configurated to post form-encoded data to make it understandable to WordPress. Something remarkable is you can post data using the JavaScript object type.

The idea for this script comes when I was developing a custom WordPress plugin but it could be used in every other modern SPA or SSR project. You can download the project here and there's a live sample running on: [https://experiments.oscaralderete.com/oajax/](https://experiments.oscaralderete.com/oajax/)

***

## Hacer llamadas Ajax desde WordPress sin jQuery

Este es una eficiente clase de JavaScript hecha para hacer llamadas Ajax desde el front-end de WordPress sin necesitar jQuery, que en su última versión pesa 88Kb, compáralo con los 3Kb de mi implementación.

Mi clase usa la API fetch() nativa de JavaScript, configurada para "postear" la data como "form-encoded" de tal modo que WordPress pueda entenderla. Es destacable que la estructura a "postear" se estructura como un objeto de tipo json de JavaScript.

La idea surgió mientras desarrollaba un plugin custom para WordPress, sin embargo esta clase puede usarse en cualquier otro moderno proyecto tipo SPA o SSR. Puedes descargarte el código aquí pero además hay un ejemplo funcional en: [https://experiments.oscaralderete.com/oajax/](https://experiments.oscaralderete.com/oajax/)

***

How to use it sample - Ejemplo de uso:

```JavaScript
var ajax = new OAjax('https://your-wordpress-admin-ajax-url');

var params = {
  action: 'save_preferences',
  data: {
    role: 'subscriber',
    user: {
      name: user.name,
      email: user.email,
      password: user.password,
      other: {
        user_comment: 'You can nest data in many deeper levels as you need'
      }
    },
    comments: 'Send data as json object is modern and cool!',
    token: pageData.token
  }
};

ajax.post(params, (response) => {
  // put your own logic here, e.g.:
  if(response.result === 'OK'){
    console.log('Hurry, it works fine!');
  }
  else{
    alert(response.message);
  }
})
```
