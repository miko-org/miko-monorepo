import { Injectable } from '@nestjs/common';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Emotion } from './emotion.entity';
import { NecordException } from 'necord';

@Injectable()
export class EmotionsService {
	public constructor(
		@InjectRepository(Emotion)
		private readonly emotionsRepository: Repository<Emotion>
	) {}

	public async getEmote(interaction: CommandInteraction) {
		const name = interaction.options.getSubcommand(true);
		const emote = await this.emotionsRepository.findOne({
			where: { name }
		});

		if (!emote) {
			throw new NecordException();
		}

		return interaction.reply({
			embeds: [
				new MessageEmbed().setAuthor({
					iconURL: interaction.user.avatarURL(),
					name: name.toUpperCase()
				})
			]
		});
	}
}
