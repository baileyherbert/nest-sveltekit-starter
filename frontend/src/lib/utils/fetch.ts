import { browser } from '$app/environment';

/**
 * Performs a `fetch()` request, but with support for `/api/` paths. This will not forward cookies when run on the
 * server, in those cases the SvelteKit fetch adapter must be used from `load()` args.
 *
 * @param input
 * @param init
 * @returns
 */
export function fetchFromNest(input: RequestInfo | URL, init?: RequestInit | undefined) {
	if (!browser && typeof input === 'string') {
		if (input.startsWith('/api/')) {
			input = 'http://localhost:3000' + input;
		}
	}

	return fetch(input, init);
}
