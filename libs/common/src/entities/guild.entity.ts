import { BaseEntity } from './base.entity';
import { Column } from 'typeorm';

export abstract class GuildEntity extends BaseEntity {
	@Column({ type: 'bigint', name: 'guild_id' })
	public guildId: string;
}
