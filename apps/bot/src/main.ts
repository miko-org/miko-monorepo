import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import * as PackageJson from '../../../package.json';

process.on('unhandledRejection', (reason: any, p: any) => {
	console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

const bootstrap = async () => {
	const app = await NestFactory.createApplicationContext(BotModule);
	const configService = app.get(ConfigService);

	Sentry.init({
		dsn: configService.get('SENTRY_DSN'),
		release: PackageJson.version,
		environment: configService.get('NODE_ENV', 'development'),
		debug: configService.get('NODE_ENV', 'development') === 'development',
		initialScope: scope => scope.setTag('instance', 'miko-bot'),
		sampleRate: 1,
		tracesSampleRate: 1,
		integrations: [
			new Sentry.Integrations.OnUnhandledRejection({ mode: 'warn' }),
			new Sentry.Integrations.OnUncaughtException(),
			new Sentry.Integrations.FunctionToString(),
			new Sentry.Integrations.Console(),
			new Sentry.Integrations.InboundFilters(),
			new Sentry.Integrations.LinkedErrors(),
			new Sentry.Integrations.Http({ breadcrumbs: true, tracing: true }),
			new Sentry.Integrations.Modules()
		]
	});
};

bootstrap();
