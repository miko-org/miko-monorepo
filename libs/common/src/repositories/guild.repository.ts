import { Repository } from 'typeorm';
import { GuildEntity } from '../entities';

export abstract class GuildRepository<T extends GuildEntity> extends Repository<T> {
	public abstract findByGuildId(guildId: string): Promise<T>;

	public abstract findAllByGuildId(guildId: string): Promise<T[]>;

	public abstract existsByGuildId(guildId: string): Promise<boolean>;
}
