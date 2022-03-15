import { Connection, DeepPartial, Repository } from 'typeorm';
import { Guild } from 'discord.js';
import { GuildEntity, GuildRepository } from '@miko/common';

export abstract class CoreService<T extends GuildEntity> extends GuildRepository<T> {
	public findByGuild(guild: Guild) {
		return this.findByGuildId(guild.id);
	}

	public findById(id: T['id']) {
		return this.findOne(id);
	}

	public async findByGuildId(guildId: T['guildId']) {
		return this.findOne({
			where: { guildId },
			cache: { id: this.getCacheKey(guildId), milliseconds: 10000 }
		});
	}

	public async save(entity) {
		return super.save(entity).then(async result => {
			await this.evict(result.guildId);
			return result;
		});
	}

	public async exists(guildId: string) {
		return this.findOneOrFail({ where: { guildId } })
			.then(() => true)
			.catch(() => false);
	}

	public async evict(...guildIds: string[]) {
		await this.manager.connection.queryResultCache.remove(guildIds.map(guildId => this.getCacheKey(guildId)));
	}

	public async findOrCreate(guildId: T['guildId']) {
		return (await this.findByGuildId(guildId)) ?? (await this.save(this.createNew(guildId)));
	}

	protected getCacheKey(id: string) {
		return [this.constructor.name, id].join(':');
	}

	protected abstract createNew(guildId: string): DeepPartial<T>;
}
