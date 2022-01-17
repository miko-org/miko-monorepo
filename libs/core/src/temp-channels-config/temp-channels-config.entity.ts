import { Column, Entity } from 'typeorm';
import { GuildEntity } from '@miko/common';

@Entity()
export class TempChannelsConfig extends GuildEntity {
	@Column({ type: 'bigint', default: null, nullable: true })
	public manager: string = null;
}
