import { SlashGroup, Context, SlashCommand } from 'necord';
import { CommandInteraction } from 'discord.js';
import { WelcomeChannelType, WelcomeConfigService } from '@miko/common';

@SlashGroup('welcome', 'we asde')
export class WelcomeCommands {
	public constructor(private readonly welcomeConfigService: WelcomeConfigService) {}

	@SlashCommand('test', 'Test command')
	public async onTest(@Context() [interaction]: [CommandInteraction]) {
		return interaction.reply({
			content: JSON.stringify(await this.welcomeConfigService.findOrCreate(interaction.guildId), null, 2)
		});
	}

	@SlashCommand('update', 'Test command')
	public async onUpdate(@Context() [interaction]: [CommandInteraction]) {
		await this.welcomeConfigService.save({
			guildId: interaction.guildId,
			channel: interaction.channelId,
			channelType: WelcomeChannelType.DM,
			message: '',
			roles: undefined,
			saveRoles: false
		});

		return interaction.reply({
			content: 'update'
		});
	}
}
