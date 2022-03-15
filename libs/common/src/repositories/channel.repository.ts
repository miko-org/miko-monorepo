import { GuildRepository } from './guild.repository';
import { ChannelEntity } from '@miko/common';

export abstract class ChannelRepository<T extends ChannelEntity> extends GuildRepository<T> {
	public abstract findByGuildIdAndChannelId(guildId: string, channelId: string): Promise<T[]>;

	public abstract deleteByGuildIdAndChannelId(guildId: string, channelId: string): Promise<T[]>;

	public exists(guildId: string, channelId: string): Promise<boolean> {
		return this.findOne({
			where: { guildId, channelId }
		})
			.then(() => true)
			.catch(() => false);
	}
}
