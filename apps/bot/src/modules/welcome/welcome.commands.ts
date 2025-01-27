import { Context, SlashCommand, SlashGroup } from 'necord';
import { CommandInteraction } from 'discord.js';
import { WelcomeChannelType, WelcomeConfigService } from '@miko/core';
import { MapPlaceholderResolver, PropertyPlaceholderHelper } from '@miko/common';

@SlashGroup('welcome', 'we asde')
export class WelcomeCommands {
	private readonly PLACEHOLDER = new PropertyPlaceholderHelper('{', '}');

	public constructor(private readonly welcomeConfigService: WelcomeConfigService) {}

	@SlashCommand('test', 'Test command')
	public async onTest(@Context() [interaction]: [CommandInteraction]) {
		const resolver = new MapPlaceholderResolver();
		resolver.set('member.mention', interaction.member.toString());
		resolver.set('member.name', interaction.member.user.username);
		resolver.set('member.roles', interaction.member.roles.toString());

		await this.welcomeConfigService.save({
			guildId: interaction.guildId,
			channelId: interaction.channelId,
			channelType: WelcomeChannelType.DM,
			message: '',
			roles: undefined,
			saveRoles: false
		});

		return interaction.reply({
			content: this.PLACEHOLDER.replacePlaceholder('TEST {member.mention} {member.roles} XXX', resolver)
		});
	}

	@SlashCommand('update', 'Test command')
	public async onUpdate(@Context() [interaction]: [CommandInteraction]) {
		console.log(await this.welcomeConfigService.findByGuildId(interaction.guildId));

		return interaction.reply({
			content: 'update'
		});
	}
}
