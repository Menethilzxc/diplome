export const apiRequest = async (url, method = 'GET', body = null) => {
	const token = localStorage.getItem('token');

	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (token) {
		options.headers.Authorization = `Bearer ${token}`;
	}

	if (body) {
		options.body = JSON.stringify(body);
	}

	const fullUrl = `http://85.198.81.221:3008${url}`;

	const response = await fetch(fullUrl, options);

	const contentType = response.headers.get('content-type');

	if (!response.ok) {
		const errorText = contentType?.includes('application/json')
			? (await response.json()).error
			: await response.text();
		throw new Error(errorText || 'Ошибка запроса');
	}

	return contentType?.includes('application/json') ? response.json() : response.text();
};
