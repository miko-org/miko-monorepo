import { Injectable } from '@nestjs/common';
import { Autocomplete, Ctx, NecordException, Opts, SlashCommand } from 'necord';
import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import { EmotionDto } from './emotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Emotion } from './emotion.entity';
import { Repository } from 'typeorm';
import { EmotionAutocomplete } from './emotion.autocomplete';

@Injectable()
export class EmotionCommand {
	public constructor(
		private readonly client: Client,
		@InjectRepository(Emotion)
		private readonly emotionsRepository: Repository<Emotion>
	) {}

	@Autocomplete(EmotionAutocomplete)
	@SlashCommand('emote', 'Show your emotions through GIFs')
	public async onAngry(@Ctx() [interaction]: [CommandInteraction], @Opts() emotionDto: EmotionDto) {
		const emote = await this.emotionsRepository.findOne(emotionDto.emote);

		if (!emote) {
			throw new NecordException('Emotion not found');
		}

		return interaction.reply({
			embeds: [
				new MessageEmbed().setAuthor({
					iconURL: interaction.user.avatarURL(),
					name: emote?.name.toUpperCase()
				})
			]
		});
	}
}