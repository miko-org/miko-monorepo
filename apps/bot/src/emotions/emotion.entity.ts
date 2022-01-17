import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@miko/common';

@Entity()
export class Emotion extends BaseEntity {
	@Column({ type: 'varchar' })
	public name: string;

	@Column({ type: 'varchar', length: 7 })
	public color: string;

	@Column({ type: 'varchar', array: true })
	public urls: string[];
}
