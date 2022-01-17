import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { DoneCallback, Job } from 'bull';
import { Client } from 'discord.js';
import { UnmuteJob } from './interfaces';

@Processor('moderation')
export class ModerationProcessor {
	private readonly logger = new Logger(ModerationProcessor.name);

	public constructor(private readonly client: Client) {}

	@Process('unmute')
	public async handleUnmute(job: UnmuteJob) {
		const guild = await this.client.guilds.fetch(job.data.guildId);
		const member = await guild.members.fetch(job.data.memberId);

		return member.roles.remove(job.data.roleId);
	}

	@Process('unban')
	public async handleUnban(job: Job) {}

	@Process('unwarn')
	public async handleUnwarn(job: Job) {}
}
