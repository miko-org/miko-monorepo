import * as Sentry from '@sentry/node';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const sentryConfig = Symbol('SENTRY_CONFIG');

export const SentryConfigProvider: Provider = {
	provide: sentryConfig,
	useFactory: (configService: ConfigService) => {
		Sentry.init({
			dsn: configService.get('SENTRY_DSN'),
			release: configService.get('npm_package_version'),
			environment: configService.get('NODE_ENV', 'development'),
			debug: configService.get('NODE_ENV', 'development') === 'development',
			initialScope: scope => scope.setTag('instance', configService.get('npm_package_name')),
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
	},
	inject: [ConfigService]
};
