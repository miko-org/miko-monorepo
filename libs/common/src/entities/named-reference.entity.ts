import { Column } from 'typeorm';

export class NamedReference {
	@Column({ type: 'bigint' })
	private id: string;

	@Column({ type: 'varchar' })
	private name: string;
}
