const path = require('path');

let _handler = null;
let _handlerLoading = false;
let _handlerDeferredRequests = [];

/**
 * Returns the absolute path to the `build` dir.
 * @returns
 */
module.exports.getWebBuildPath = () => {
	return path.resolve(__dirname, '../build');
};

/**
 * Returns the absolute path to the `build/client` dir, where static assets are built.
 * @returns
 */
module.exports.getWebAssetsPath = () => {
	return path.resolve(__dirname, '../build/client');
};

/**
 * Returns an express-compatible function for the built SvelteKit app.
 *
 * Loading the handler is an asynchronous operation because it's an ES module. The returned function will automatically
 * defer all traffic until the handler is loaded.
 *
 * @returns
 */
module.exports.getWebHandler = () => {
	return function handle(req, res, next) {
		if (_handler) {
			return _handler(req, res, next);
		}

		if (_handlerDeferredRequests) {
			_handlerDeferredRequests.push([req, res, next]);
			loadHandler();
		}
		else {
			res.writeHead(500);
			res.end();

			throw new Error('Request deferrment exited before kit was ready - this should never happen!');
		}
	};
};

/**
 * Returns the port that SvelteKit runs on during vite development.
 *
 * @returns
 */
module.exports.getWebDevelopmentPort = () => {
	return 5173;
};

/**
 * Asynchronously loads the SvelteKit handler if needed, and executes deferred traffic after completion.
 *
 * @returns
 */
function loadHandler() {
	if (!_handlerLoading) {
		_handlerLoading = true;

		(async function () {
			const handlerPath = path.resolve(__dirname, '../build/handler.js');
			const handler = await import(handlerPath);

			_handler = handler.handler;

			for (const args of _handlerDeferredRequests) {
				_handler(...args);
			}

			_handlerDeferredRequests = null;
		})();

		return undefined;
	}
}
