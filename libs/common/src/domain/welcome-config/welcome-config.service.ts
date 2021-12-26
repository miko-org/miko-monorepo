import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DOMAIN_IS_CACHEABLE } from '../../providers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WelcomeConfig } from '.';
import { BaseDomainService } from '../base-domain.service';

@Injectable()
export class WelcomeConfigService extends BaseDomainService<WelcomeConfig> {
	public constructor(
		@Inject(DOMAIN_IS_CACHEABLE)
		protected readonly isCacheable: boolean,
		@Inject(CACHE_MANAGER)
		protected readonly cacheManager: Cache,
		@InjectRepository(WelcomeConfig)
		protected readonly repository: Repository<WelcomeConfig>
	) {
		super();
	}
}
