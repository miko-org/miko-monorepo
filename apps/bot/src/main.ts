import { NestFactory, Reflector } from '@nestjs/core';
import { CooldownGuard, PermissionsGuard } from '@miko/common';
import { BotModule } from './bot.module';
import { NecordExceptionFilter } from './filters';
import { ConfigService } from '@nestjs/config';

const bootstrap = async () => {
	const app = await NestFactory.create(BotModule);
	const reflector = app.get(Reflector);
	const configService = app.get(ConfigService);

	app.useGlobalGuards(new CooldownGuard(reflector), new PermissionsGuard(reflector));
	app.useGlobalFilters(new NecordExceptionFilter());

	await app.init();
};

bootstrap();

process.on('unhandledRejection', (reason: any, p: any) => null);
