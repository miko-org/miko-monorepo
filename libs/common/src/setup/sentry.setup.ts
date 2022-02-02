import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Sentry from '@sentry/node';
import PackageJson from '../../../../package.json';

export function sentrySetup(app: INestApplicationContext, instance = 'miko-bot') {
	const configService = app.get(ConfigService);

	Sentry.init({
		dsn: configService.get('SENTRY_DSN'),
		release: PackageJson.version,
		environment: configService.get('NODE_ENV', 'development'),
		debug: configService.get('NODE_ENV', 'development') === 'development',
		initialScope: scope => scope.setTag('instance', instance),
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
}
