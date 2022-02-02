import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Client } from 'discord.js';
import { UnbanJob, UnmuteJob } from './interfaces';

@Processor('moderation')
export class ModerationProcessor {
	private readonly logger = new Logger(ModerationProcessor.name);

	public constructor(private readonly client: Client) {}

	@Process({ name: 'unmute', concurrency: 5 })
	public async handleUnmute(job: UnmuteJob) {
		if (!this.client.isReady()) {
			throw new Error('Client not ready');
		}

		const guild = await this.client.guilds.fetch(job.data.guildId);
		const member = await guild.members.fetch(job.data.memberId);

		return member.roles.remove(job.data.roleId);
	}

	@Process('unban')
	public async handleUnban(job: UnbanJob) {
		if (!this.client.isReady()) {
			throw new Error('Client not ready');
		}

		const guild = await this.client.guilds.fetch(job.data.guildId);
		return guild.members.unban(job.data.memberId);
	}

	@Process('unwarn')
	public async handleUnwarn(job: Job) {}
}
