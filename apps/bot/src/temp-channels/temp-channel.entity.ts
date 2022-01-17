import { Column, Entity } from 'typeorm';
import { ChannelEntity } from '@miko/common';

@Entity()
export class TempChannel extends ChannelEntity {
	@Column({ type: 'bigint' })
	public owner: string;

	@Column({ type: 'bigint', default: {}, array: true })
	private admins: string[] = [];

	public isOwner = (userId: string) => this.owner === userId;

	public isAdmin = (userId: string) => this.admins.includes(userId);
}
