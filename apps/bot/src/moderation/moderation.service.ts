import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { GuildMember } from 'discord.js';
import { UnbanJobData, UnMuteJobData } from './interfaces';

@Injectable()
export class ModerationService {
	public constructor(
		@InjectQueue('moderation')
		private readonly moderationQueue: Queue<UnMuteJobData | UnbanJobData>
	) {}

	public async mute(member: GuildMember, roleId: string) {
		await member.roles.add(roleId);
		return this.moderationQueue.add(
			'unmute',
			{ guildId: member.guild.id, memberId: member.id, roleId },
			{
				delay: 10000
			}
		);
	}

	public unmute() {
		return this.moderationQueue.removeJobs('123');
	}
}
