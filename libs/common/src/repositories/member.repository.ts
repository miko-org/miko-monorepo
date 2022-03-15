import { MemberEntity } from '../entities';
import { GuildRepository } from './guild.repository';

export abstract class MemberRepository<T extends MemberEntity> extends GuildRepository<T> {
	public abstract findAllByGuildIdAndUserId(guildId: string, userId: string): Promise<T[]>;

	public abstract findByGuildIdAndUserId(guildId: string, userId: string): Promise<T>;

	public abstract deleteByGuildIdAndUserId(guildId: string, userId: string): Promise<void>;
}
