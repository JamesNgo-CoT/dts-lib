const fs = require('fs');

const { quote, tag } = require('string-factory');

const content = quote([
	tag('h2', { tabindex: -1 }, 'Error'),
	tag('div', { class: 'alert alert-danger', role: 'alert' }, [
		tag('p', null, 'The application has encountered an unknown error. Please try again later.'),
	]),
]);

fs.writeFileSync('./error-view', content);
