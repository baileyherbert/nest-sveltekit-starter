import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomLogger } from './abstract/logger';
import { configure } from './abstract/configure';
import { createSvelteProxy } from './abstract/svelte';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
	const proxy = await createSvelteProxy();
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: new CustomLogger(),
		forceCloseConnections: true
	});

	app.setGlobalPrefix('/api');
	app.use('/', (request: Request, response: Response, next: NextFunction) => {
		if (!request.path.startsWith('/api/')) {
			return proxy(request, response, next);
		}

		return next();
	});

	await configure(app);
}

bootstrap().catch(error => {
	console.error(error);
	process.exit(1);
});
