import setCookie from 'set-cookie-parser';

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {
	let url = new URL(request.url);
	let enableCookiePassthrough = false;

	// Detect fetch requests that are intended for the backend and rewrite them
	if (event.url.host === url.host) {
		url.port = '3000';
		url.hostname = 'localhost';
		url.protocol = 'http:';

		// Forward all cookies
		request.headers.set(
			'cookie',
			event.cookies
				.getAll()
				.filter(({ value }) => value !== '')
				.map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
				.join('; ')
		);

		// Forward the referer header
		if (event.request.headers.has('referer')) {
			request.headers.set('referer', event.request.headers.get('referer')!);
		}

		// Forward the original query parameters
		request.headers.set('x-original-query', event.url.searchParams.toString());
		request.headers.set('x-forwarded-for', event.platform?.req.ip ?? event.getClientAddress());

		// Forward the user-agent
		request.headers.set('user-agent', event.request.headers.get('user-agent') ?? 'SvelteKit');
		request.headers.set('x-sveltekit-fetch', '1');

		request = new Request(url.toString(), request);
		enableCookiePassthrough = true;
	}

	// Execute the request
	const response = await fetch(request);

	// Set cookies from the response
	if (enableCookiePassthrough) {
		const header = response.headers.getSetCookie();

		for (const cookie of header) {
			const cookies = setCookie.parse(cookie);

			for (const cookie of cookies) {
				event.cookies.set(cookie.name, cookie.value, {
					path: cookie.path ?? '/',
					expires: cookie.expires,
					secure: cookie.secure,
					sameSite: cookie.sameSite as 'lax' | 'strict' | 'none' | undefined,
					maxAge: cookie.maxAge,
					httpOnly: cookie.httpOnly,
					domain: event.url.hostname
				});
			}
		}
	}

	return response;
}
