import { NestFactory, Reflector } from '@nestjs/core';
import { BotModule } from './bot.module';
import { CommonExceptionFilter } from './filters';
import { ConfigService } from '@nestjs/config';

const bootstrap = async () => {
	const app = await NestFactory.create(BotModule);
	const reflector = app.get(Reflector);
	const configService = app.get(ConfigService);

	app.useGlobalFilters(new CommonExceptionFilter());

	await app.init();
};

bootstrap();

process.on('unhandledRejection', (reason: any, p: any) => null);
