import { GuildEntity } from './guild.entity';
import { Column } from 'typeorm';

export abstract class ChannelEntity extends GuildEntity {
	@Column({ type: 'bigint', name: 'channel_id' })
	public channelId: string;
}
