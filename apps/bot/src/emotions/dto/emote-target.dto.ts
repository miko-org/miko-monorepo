import { MemberOption } from 'necord';
import { GuildMember } from 'discord.js';

export class EmoteTargetDto {
	@MemberOption({ name: 'target', required: false, description: 'Specify the person who should see your emotions' })
	public target: GuildMember;
}
