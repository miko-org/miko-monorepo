import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ContextOf, NecordException, NecordExecutionContext } from 'necord';
import { CommandInteraction, Interaction } from 'discord.js';

const PERMISSIONS_METADATA = 'miko:permissions_metadata';

export const BotPermissions = () => SetMetadata(PERMISSIONS_METADATA, {});

@Injectable()
export class PermissionsGuard implements CanActivate {
	private times = 0;

	public constructor(private readonly reflector: Reflector) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const necordContext = NecordExecutionContext.create(context);
		const [interaction] = necordContext.getContext<ContextOf<'interactionCreate'>>();

		if (interaction instanceof CommandInteraction) {
			this.times++
			console.log(this.times, interaction.id, interaction.replied);
		}

		// if (interaction instanceof CommandInteraction && interaction?.isApplicationCommand()) {
		// 	throw new NecordException('bla-bla');
		// }
		return true;
	}
}
