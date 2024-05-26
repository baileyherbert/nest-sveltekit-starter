/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch }) {
	const url = new URL(request.url);

	// Rewrites API-bound requests in both development and production
	if (url.port === '3000' || url.port === '5173') {
		url.port = '3000';
		url.hostname = 'localhost';
		url.protocol = 'http:';

		request.headers.set('User-Agent', 'SvelteKit-SSR');
		request = new Request(url.toString(), request);
	}

	return fetch(request);
}
