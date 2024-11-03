import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		external: []
	},
	server: {
		hmr: {
			clientPort: 5173
		},
	}
});
