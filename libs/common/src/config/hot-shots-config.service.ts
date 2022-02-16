import { HotShotsModule, HotShotsModuleOptions, HotShotsOptionsFactory } from 'nestjs-hot-shots';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HotShotsConfigService implements HotShotsOptionsFactory {
	private readonly logger = new Logger(HotShotsModule.name);

	public constructor(private readonly configService: ConfigService) {}

	public createHotShotsOptions(): HotShotsModuleOptions {
		return {
			mock: this.configService.get('NODE_ENV', 'development') === 'development',
			host: this.configService.get('STATSD_HOST', 'localhost'),
			port: this.configService.get('STATSD_PORT', 8125),
			prefix: 'miko.',
			sampleRate: 1,
			globalTags: {
				env: this.configService.get('NODE_ENV', 'development')
			},
			errorHandler: err => this.logger.error(err)
		};
	}
}
