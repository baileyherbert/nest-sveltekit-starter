declare module '@workspace/frontend' {
	/**
	 * Returns an absolute path to the `build` folder for the web application.
	 */
	export function getWebBuildPath(): string;

	/**
	 * Returns an absolute path to the static assets folder for the web application.
	 */
	export function getWebAssetsPath(): string;

	/**
	 * Returns the handler to use for interfacing with the web application like an express middleware. This can also
	 * be wrapped inside an `express()` call to create an app around it.
	 */
	export function getWebHandler(): ExpressCompatibleFunction;

	/**
	 * Returns the port number that vite is configured to run on during development.
	 */
	export function getWebDevelopmentPort(): number;

	/**
	 * A function that can be used as an express middleware.
	 */
	type ExpressCompatibleFunction = (req: any, res: any, next: (...args: any[]) => any) => any;
}
