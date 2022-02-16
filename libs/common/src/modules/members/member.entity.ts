import { Column, Entity, ManyToOne } from 'typeorm';
import { GuildEntity, LocalUser } from '@miko/common';

@Entity({ name: 'member' })
export class LocalMember extends GuildEntity {
	@ManyToOne(() => LocalUser, user => user.userId)
	public user: LocalUser;

	@Column({ type: 'varchar' })
	public nickname: string;

	@Column({ type: 'bigint', array: true })
	public lastKnownRoles: string[];
}
