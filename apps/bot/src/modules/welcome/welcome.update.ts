import { Injectable, Logger } from '@nestjs/common';
import { ContextOf, Ctx, On } from 'necord';

@Injectable()
export class WelcomeUpdate {
	private readonly logger = new Logger(WelcomeUpdate.name);

	@On('guildMemberEntered')
	public onEntered(@Ctx() [member]: ContextOf<'guildMemberEntered'>) {
		if (member.user.bot) return;

		const guild = member.guild;
		const me = guild.me;

		if (!me.permissions.has('MANAGE_ROLES')) {
			this.logger.warn(`Trying to set join roles in ${guild.id} without permissions`);
			return;
		}
	}
}
