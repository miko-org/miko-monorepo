import { NecordModuleOptions, NecordOptionsFactory } from 'necord';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NecordConfigService implements NecordOptionsFactory {
	public constructor(private readonly configService: ConfigService) {}

	public createNecordOptions(): NecordModuleOptions {
		return {
			token: this.configService.get('DISCORD_TOKEN'),
			development: [this.configService.get('DISCORD_DEV_GUILD')],
			intents: [
				'GUILD_BANS',
				'GUILDS',
				'GUILD_MESSAGES',
				'DIRECT_MESSAGES',
				'GUILD_VOICE_STATES',
				'GUILD_MEMBERS'
			],
			presence: {
				activities: [
					{
						name: 'https://miko.bot | /help',
						type: 'WATCHING',
						url: 'https://miko.bot'
					}
				]
			},
			shardCount: 1
		};
	}
}
