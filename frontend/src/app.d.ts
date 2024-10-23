import {} from '@workspace/common';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			req: import('http').IncomingMessage & {};
		}
	}
}

export {};
