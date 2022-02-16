import { MemberOption, StringOption } from 'necord';
import { GuildMember } from 'discord.js';

export class EmotionDto {
	@StringOption({
		name: 'emote',
		description: 'What emotion are you feeling right now?',
		autocomplete: true,
		required: true
	})
	public emote: string;

	@MemberOption({ name: 'target', required: false, description: 'Specify the person who should see your emotions' })
	public target: GuildMember;
}
