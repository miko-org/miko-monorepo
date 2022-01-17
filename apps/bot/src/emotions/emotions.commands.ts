import { Injectable } from '@nestjs/common';
import { Ctx, Opts, SlashCommand, SlashGroup } from 'necord';
import { Client, CommandInteraction, GuildMember } from 'discord.js';
import { DevGuild } from '@miko/common';
import { EmotionsService } from './emotions.service';

@DevGuild
@Injectable()
@SlashGroup('emote', 'Show your emotions through GIFs')
export class EmotionsCommands {
	public constructor(private readonly client: Client, private readonly emotionsService: EmotionsService) {}

	@SlashCommand('angry', 'Show how angry you are with GIFs')
	public async onAngry(@Ctx() [interaction]: [CommandInteraction], @Opts('target') member: GuildMember) {
		return this.emotionsService.getEmote(interaction);
	}
}
