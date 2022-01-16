import { DeepPartial, Repository } from 'typeorm';
import { Guild } from 'discord.js';
import { Cache } from 'cache-manager';

export abstract class BaseDomainService<T, R extends Repository<T> = Repository<T>> {
	protected abstract isCacheable: boolean;

	protected abstract cacheManager: Cache;

	protected abstract repository: R;

	protected abstract createNew(guildId: string): T;

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

		const cached = await this.cacheManager.get(this.getCacheKey(guildId));

		if (cached) {
			return cached;
		}

		const result = await this.repository.findOne(guildId);
		await this.cacheManager.set(this.getCacheKey(guildId), result, { ttl: 1000 });
		return result;
	}

	public async save(entity: DeepPartial<T>) {
		const result = await this.repository.save(entity);
		await this.evict(this.repository.getId(result));
		return result;
	}

	public async evict(guildId: string) {
		if (this.isCacheable && guildId) {
			await this.cacheManager.del(this.getCacheKey(guildId));
		}
	}

	public async findOrCreate(guildId: string) {
		return (await this.findByGuildId(guildId)) ?? (await this.save(this.createNew(guildId)));
	}

	protected getCacheKey(id: string) {
		return [this.repository.metadata.name, id].join(':');
	}
}
