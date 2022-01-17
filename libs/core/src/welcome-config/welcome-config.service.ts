import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DOMAIN_IS_CACHEABLE } from '@miko/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WelcomeConfig } from './index';
import { CoreService } from '../core.service';

@Injectable()
export class WelcomeConfigService extends CoreService<WelcomeConfig> {
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

	protected createNew(guildId: string): WelcomeConfig {
		return this.repository.create({
			guildId
		});
	}
}
