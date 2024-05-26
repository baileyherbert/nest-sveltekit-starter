import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './database/typeorm';
import { CustomRepositoriesModule } from './abstract/modules/CustomRepositoriesModule';
import { AbstractModule } from './abstract/modules/AbstractModule';
import { AppController } from './app.controller';

@Module({
	imports: [
		AbstractModule,
		TypeOrmModule.forRoot(config),
		CustomRepositoriesModule.forRoot(config),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
