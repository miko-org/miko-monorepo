import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
	@PrimaryGeneratedColumn('increment', { type: 'bigint' })
	public id: string;

	public toString() {
		return this.constructor.name + ' [ID=' + this.id + ']';
	}
}
