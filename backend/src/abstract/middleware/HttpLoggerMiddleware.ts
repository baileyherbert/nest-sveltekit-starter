import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Environment } from '../../app.environment';
import { logger } from '../logger';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
	use(request: Request, response: Response, next: NextFunction): void {
		writeTrafficLog(request, response);
		next();
	}
}

const trafficLogger = logger.createChild('Http');

export function writeTrafficLog(request: Request, response: Response) {
	if (Environment.APP_LOGGING_REQUESTS) {
		const { ip, method, originalUrl } = request;
		const start = Date.now();

		response.on('finish', () => {
			const { statusCode } = response;
			const took = Date.now() - start;
			const agent = request.get('user-agent') || '-';

			trafficLogger.info(`${ip} "${method} ${originalUrl}" "${agent}" ${statusCode} ${took}ms`);
		});
	}
}
