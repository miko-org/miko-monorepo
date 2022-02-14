import { TransformOptions } from 'necord';
import { Injectable } from '@nestjs/common';
import { ApplicationCommandOptionChoice, AutocompleteInteraction } from 'discord.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Emotion } from './emotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmotionAutocomplete implements TransformOptions {
	public constructor(
		@InjectRepository(Emotion)
		private readonly emotionsRepository: Repository<Emotion>
	) {}

	public async transformOptions(
		interaction: AutocompleteInteraction,
		focused: ApplicationCommandOptionChoice
	): Promise<ApplicationCommandOptionChoice[]> {
		const emotions = await this.emotionsRepository.find();

		return emotions.map(emote => ({ name: emote.name, value: emote.id }));
	}
}
