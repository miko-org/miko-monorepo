import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';
import { sentrySetup } from '@miko/common';

const bootstrap = async () => {
	const app = await NestFactory.createApplicationContext(BotModule);

	sentrySetup(app);
};

bootstrap();

process.on('unhandledRejection', (reason: any, p: any) => {
	console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
