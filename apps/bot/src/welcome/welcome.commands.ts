import { Context, SlashCommand, SlashGroup } from 'necord';
import { CommandInteraction } from 'discord.js';
import { WelcomeChannelType, WelcomeConfigService } from '@miko/core';
import { MapPlaceholderResolver, PropertyPlaceholderHelper } from '@miko/templates';

@SlashGroup('welcome', 'we asde')
export class WelcomeCommands {
	private readonly PLACHOLDER = new PropertyPlaceholderHelper('{', '}');

	public constructor(private readonly welcomeConfigService: WelcomeConfigService) {}

	@SlashCommand('test', 'Test command')
	public async onTest(@Context() [interaction]: [CommandInteraction]) {
		const resolver = new MapPlaceholderResolver();
		resolver.set('member.mention', interaction.member.toString());
		resolver.set('member.name', interaction.member.user.username);
		resolver.set('member.roles', interaction.member.roles.toString());

		return interaction.reply({
			content: this.PLACHOLDER.replacePlaceholder('TEST {member.mention} {member.roles} XXX', resolver)
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
