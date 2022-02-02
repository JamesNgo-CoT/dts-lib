const fs = require('fs');

const { quote, tag } = require('string-factory');

const content = quote([
	tag('h2', { tabindex: -1 }, 'Under Maintenance'),
	tag('div', { class: 'alert alert-warning', role: 'alert' }, [
		tag('p', null, 'The application is currently under maintenance. Please try again later.'),
	]),
]);

fs.writeFileSync('./maintenance-view', content);
