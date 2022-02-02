import { NestFactory, Reflector } from '@nestjs/core';
import { BotModule } from './bot.module';
import { CooldownGuard, NecordExceptionFilter, PermissionsGuard, sentrySetup } from '@miko/common';

const bootstrap = async () => {
	const app = await NestFactory.create(BotModule);
	const reflector = app.get(Reflector);

	app.useGlobalGuards(new CooldownGuard(reflector), new PermissionsGuard(reflector));
	app.useGlobalFilters(new NecordExceptionFilter());

	await app.init();
	sentrySetup(app);
};

bootstrap();

process.on('unhandledRejection', (reason: any, p: any) => null);
