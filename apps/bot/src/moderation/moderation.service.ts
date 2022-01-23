import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { GuildMember } from 'discord.js';
import { UnbanJobData, UnMuteJobData } from './interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ModerationService {
	public constructor(
		@InjectQueue('moderation')
		private readonly moderationQueue: Queue<UnMuteJobData | UnbanJobData>,
		private readonly configService: ConfigService
	) {}

	public async mute(member: GuildMember, roleId: string) {
		if (!this.configService.get('MASTER', false)) return;

		await member.roles.add(roleId);
		const job = await this.moderationQueue.add('unmute', { guildId: member.guild.id, memberId: member.id, roleId });
		const startedAt = performance.now();

		await job.finished();
		console.log('Arrived alter', performance.now() - startedAt);

		return;
	}

	public unmute() {
		return this.moderationQueue.removeJobs('123');
	}
}
