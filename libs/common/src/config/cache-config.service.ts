import type { RedisOptions } from 'ioredis';
import { CacheModuleOptions, CacheOptionsFactory, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ioredisStore from 'cache-manager-ioredis';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory<RedisOptions> {
	public constructor(private readonly configService: ConfigService) {}

	public createCacheOptions(): CacheModuleOptions {
		return {
			store: ioredisStore,
			host: this.configService.get('REDIS_HOST', 'localhost'),
			port: this.configService.get('REDIS_PORT', 6379),
			username: this.configService.get('REDIS_USERNAME'),
			password: this.configService.get('REDIS_PASSWORD')
		};
	}
}
