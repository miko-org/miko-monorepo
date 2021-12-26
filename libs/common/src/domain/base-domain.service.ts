import { Repository } from 'typeorm';
import { Guild } from 'discord.js';
import { Cache } from 'cache-manager';

export abstract class BaseDomainService<T, R extends Repository<T> = Repository<T>> {
	protected abstract isCacheable: boolean;

	protected abstract cacheManager: Cache;

	// protected abstract cacheKey: (...args) => string;

	protected abstract repository: R;

	public findOne(guild: Guild) {
		return this.findByGuildId(guild.id);
	}

	public findById(id: string) {
		return this.repository.findOne(id);
	}

	public async findByGuildId(guildId: string) {
		if (!this.isCacheable) {
			return this.repository.findOne(guildId);
		}

		const cached = await this.cacheManager.get('');

		return;
	}

	// protected abstract createNew(guildId: string): T;
	//
	// protected abstract getDomainClass();
}
