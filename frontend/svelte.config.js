import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			quietDeps: true,
			silenceDeprecations: ['import']
		}
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$common: '../common/src'
		}
	},

	compilerOptions: {
		warningFilter: (warning) => {
			if (warning.code === 'reactive_declaration_non_reactive_property') {
				return false;
			}

			return true;
		}
	}
};

export default config;
