import { Column, Entity, ManyToOne } from 'typeorm';
import { LocalUser } from '../users/local-user.entity';
import { GuildEntity } from '@miko/common';

@Entity({ name: 'member' })
export class LocalMember extends GuildEntity {
	@ManyToOne(() => LocalUser, user => user.userId)
	public user: LocalUser;

	@Column({ type: 'varchar' })
	public nickname: string;
}
