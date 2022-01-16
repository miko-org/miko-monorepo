import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TempChannelsConfig {
	@PrimaryColumn({ type: 'bigint' })
	public guildId: string;

	@Column({ type: 'bigint', default: null, nullable: true })
	public manager: string = null;
}
