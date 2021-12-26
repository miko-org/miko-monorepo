import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const DOMAIN_IS_CACHEABLE = 'miko:domain_is_cacheable';

export const createCacheableDomainProvider = (env: string): Provider<boolean> => ({
	provide: DOMAIN_IS_CACHEABLE,
	useFactory: (configService: ConfigService) => Boolean(configService.get(env, false)),
	inject: [ConfigService]
});
