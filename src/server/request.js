function getHeaders(request, headers = {}) {
	headers = Object.assign({
		'Accept': 'application/json; charset=utf-8',
		'Content-Type': 'application/json; charset=utf-8'
	}, headers);

	const authorization = request.getHeader('Authorization');
	if (authorization) {
		headers['Authorization'] = authorization;
	}

	return headers;
}

function getEntityUrl(request, entity, id, queries) {
	let url = `${request.getRawBaseUri()}/${entity}`;

	if (id) {
		url = `${url}('${encodeURIComponent(id)}')`;
	}

	if (queries) {
		if (typeof queries === 'object') {
			if (!Array.isArray(queries)) {
				const temp = [];
				for (const key in queries) {
					temp.push(`${key}=${encodeURIComponent(queries[key])}`);
				}
				queries = temp;
			}
			queries = queries.join('&');
		}
		url = `${url}?${queries}`;
	}

	return url;
}

function getEntitySetUrl(request, entity, queries) {
	return getEntityUrl(request, entity, null, queries);
}

module.exports = {
	getHeaders,
	getEntityUrl,
	getEntitySetUrl
};
