import { CommandGroup, Context, SlashCommand } from 'necord';
import { CommandInteraction } from 'discord.js';
import { WelcomeConfigService } from '@miko/common';

@CommandGroup({ name: 'welcome', description: 'we asde' })
export class WelcomeCommands {
	public constructor(private readonly welcomeConfigService: WelcomeConfigService) {}

	@SlashCommand({ name: 'test', description: 'Test command' })
	public async onTest(@Context() interaction: CommandInteraction) {
		return interaction.reply({
			content: JSON.stringify(await this.welcomeConfigService.findOrCreate(interaction.guildId), null, 2)
		});
	}
}
