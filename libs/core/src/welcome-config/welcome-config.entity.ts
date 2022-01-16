import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum WelcomeChannelType {
	DM,
	GUILD_CHANNEL
}

@Entity()
export class WelcomeConfig {
	@PrimaryColumn({ type: 'bigint' })
	public guildId: string;

	@Column({ type: 'varchar', default: {}, array: true })
	public roles?: string[] = [];

	@Column({ type: 'boolean', default: false })
	public saveRoles?: boolean = false;

	@Column({ type: 'integer', default: null, nullable: true })
	public channelType?: WelcomeChannelType = null;

	@Column({ type: 'bigint', default: null, nullable: true })
	public channel?: string = null;

	@Column({ type: 'varchar', default: null, nullable: true })
	public message?: string = null;
}
