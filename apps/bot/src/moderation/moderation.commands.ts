import { Injectable } from '@nestjs/common';
import { Ctx, Guilds, SlashCommand } from 'necord';
import { ModerationService } from './moderation.service';
import { CommandInteraction, GuildMember } from "discord.js";

@Injectable()
export class ModerationCommands {
	public constructor(private readonly moderationService: ModerationService) {}

	@SlashCommand('mute', 'Mute user')
	public onMute(@Ctx() [interaction]: [CommandInteraction]) {
		return this.moderationService.mute(interaction.member as GuildMember, '780155734838083594');
	}

	@SlashCommand('unmute', 'Unmute user')
	public onUnmute() {
		return this.moderationService.unmute();
	}
}
