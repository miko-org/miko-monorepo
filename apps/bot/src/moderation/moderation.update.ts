import { Injectable } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';

@Injectable()
export class ModerationUpdate {
	// TODO: Check if user muted
	@On('messageCreate')
	public async onMutedMessage(@Context() [message]: ContextOf<'messageCreate'>) {
		if (
			message.webhookId ||
			message.author.bot ||
			!message.member ||
			!message.channel ||
			message.type !== 'DEFAULT'
		)
			return;

		const me = message.guild.me;
		const channel = message.channel;

		if (me.permissionsIn(channel.id).has('MANAGE_MESSAGES')) {
			await message.delete();
			return;
		}
	}
}
