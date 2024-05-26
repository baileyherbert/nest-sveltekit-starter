import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		external: []
	},
	optimizeDeps: {
		exclude: [
			'@workspace/common'
		],
	},
	server: {
		hmr: {
			clientPort: 5173
		},
	}
});
