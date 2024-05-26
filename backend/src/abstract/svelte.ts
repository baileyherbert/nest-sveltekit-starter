import { getWebHandler } from '@workspace/frontend';
import { Environment } from 'src/app.environment';
import { logger } from './logger';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextFunction, Request, Response } from 'express';
import { writeTrafficLog } from './middleware/HttpLoggerMiddleware';
import { Agent } from 'http';

/**
 * Returns an express middleware function that proxies the SvelteKit application for the current environment.
 *
 * - In `development`, proxies the vite development server using an HTTP middleware.
 * - In `production`, executes the SvelteKit application directly from its express-compatible handler function.
 *
 * @returns
 */
export async function createSvelteProxy() {
	if (Environment.NODE_ENV !== 'production') {
		const proxyLogger = logger.createChild('HttpProxy');
		const proxy = createProxyMiddleware({
			target: 'http://localhost:5173',
			changeOrigin: true,
			logLevel: 'silent',
			agent: new Agent({
				keepAlive: true,
				maxSockets: 100,
			}),
			onError: (err, _req, res) => {
				proxyLogger.error('Failed to proxy SvelteKit development server:', err);
				res.writeHead(502);
				res.end();
			},
		});

		return proxy;
	} else {
		const handler = getWebHandler();

		return (req: Request, res: Response, next: NextFunction) => {
			writeTrafficLog(req, res);
			return handler(req, res, next);
		};
	}
}
