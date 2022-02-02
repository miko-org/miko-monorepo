import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { ContextOf, NecordExecutionContext } from 'necord';
import { Snowflake } from 'discord.js';
import { Reflector } from '@nestjs/core';

interface CooldownConfig {
	mode: 'NONE' | 'USER' | 'CHANNEL' | 'SERVER';
	threshold: number;
}

const COOLDOWN_METADATA = 'miko:cooldown_metadata';

export const Cooldown = (config: CooldownConfig) => SetMetadata<string, CooldownConfig>(COOLDOWN_METADATA, config);

@Injectable()
export class CooldownGuard implements CanActivate {
	private readonly THRESHOLD = 60 * 1000;

	private readonly coolDownHolder = new Map<Snowflake, string>();

	public constructor(private readonly reflector: Reflector) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const necordContext = NecordExecutionContext.create(context);
		const interaction = necordContext.getContext<ContextOf<'interactionCreate'>>();
		const cooldown = this.reflector.getAllAndOverride(COOLDOWN_METADATA, [
			context.getHandler(),
			context.getClass()
		]);

		return true;
	}
}
