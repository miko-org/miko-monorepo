import { Column, Entity } from 'typeorm';
import { ChannelEntity } from '@miko/common';

@Entity()
export class TempChannel extends ChannelEntity {
	@Column({ type: 'bigint', name: 'owner_id' })
	private ownerId: string;

	public isOwner = (userId: string) => this.ownerId === userId;
}
