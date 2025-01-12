import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		external: []
	},
	server: {
		host: '0.0.0.0',
		hmr: {
			clientPort: 5173
		},
	}
});
