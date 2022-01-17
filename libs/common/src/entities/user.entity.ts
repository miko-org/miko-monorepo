import { BaseEntity } from './base.entity';
import { Column } from 'typeorm';

export abstract class UserEntity extends BaseEntity {
	@Column({ type: 'bigint', name: 'user_id' })
	public userId: string;
}
