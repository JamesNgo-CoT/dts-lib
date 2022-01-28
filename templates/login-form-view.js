const fs = require('fs');

const { quote, tag } = require('string-factory');

const content = quote([
	tag('button', { class: 'btn btn-primary', style: 'margin-bottom: 25px;' }, 'Login'),
	tag('p', null, [
		'Need help logging in? Contact',
		tag('a', { href: 'mailto:itservice@toronto.ca' }, 'IT Service Desk'),
		'or call',
		tag('a', { href: 'tel:416-338-2255' }, '416-338-2255')
	].join(' '))
]);

fs.writeFileSync('./login-form-view', content);
