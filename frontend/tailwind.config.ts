import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	plugins: [forms, typography],
	theme: {
		extend: {},
	},
} as Config;
