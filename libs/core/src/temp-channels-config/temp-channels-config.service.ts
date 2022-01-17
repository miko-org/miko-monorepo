import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DOMAIN_IS_CACHEABLE } from '@miko/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreService } from '../core.service';
import { TempChannelsConfig } from './temp-channels-config.entity';

@Injectable()
export class TempChannelsConfigService extends CoreService<TempChannelsConfig> {
	public constructor(
		@Inject(DOMAIN_IS_CACHEABLE)
		protected readonly isCacheable: boolean,
		@Inject(CACHE_MANAGER)
		protected readonly cacheManager: Cache,
		@InjectRepository(TempChannelsConfig)
		protected readonly repository: Repository<TempChannelsConfig>
	) {
		super();
	}

	protected createNew(guildId: string): TempChannelsConfig {
		return this.repository.create({
			guildId
		});
	}
}
