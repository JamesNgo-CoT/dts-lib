const fs = require('fs');

const { quote } = require('string-factory');

const content = quote([
	'Loading\u2026'
]);

fs.writeFileSync('./loading-view', content);
