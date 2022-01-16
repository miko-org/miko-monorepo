import { Injectable } from '@nestjs/common';
import { Ctx, Opts, SlashCommand, SlashGroup } from 'necord';
import { CommandInteraction } from 'discord.js';
import { EmoteTargetDto } from './dto';

@Injectable()
@SlashGroup('emote', 'Show your emotions through GIFs')
export class EmotionsCommands {
	@SlashCommand('angry', 'Show how angry you are with GIFs')
	public async onAngry(@Ctx() [interaction]: [CommandInteraction], @Opts() options: EmoteTargetDto) {}
}
