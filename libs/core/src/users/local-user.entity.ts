import { UserEntity } from '@miko/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class LocalUser extends UserEntity {
	@Column({ type: 'varchar' })
	public name: string;

	@Column({ type: 'varchar' })
	public discriminator: string;

	@Column({ type: 'varchar' })
	public avatarUrl: string;
}
