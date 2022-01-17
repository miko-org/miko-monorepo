import { GuildEntity } from './guild.entity';
import { Column } from 'typeorm';

export abstract class MemberEntity extends GuildEntity {
	@Column({ type: 'bigint', name: 'user_id' })
	public userId: string;
}
