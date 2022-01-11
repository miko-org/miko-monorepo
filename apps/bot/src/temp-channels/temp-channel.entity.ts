import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TempChannel {
	@PrimaryColumn({ type: 'bigint' })
	public channelId: string;

	@Column({ type: 'bigint' })
	public guildId: string;

	@Column({ type: 'bigint' })
	public owner: string;

	@Column({ type: 'bigint', default: {}, array: true })
	private admins: string[] = [];

	public isOwner = (userId: string) => this.owner === userId;

	public isAdmin = (userId: string) => this.admins.includes(userId);
}
