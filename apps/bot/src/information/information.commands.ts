import { Injectable } from '@nestjs/common';
import { Context, Options, SlashCommand, UserCommand } from 'necord';
import { Client, CommandInteraction, ContextMenuInteraction, MessageEmbed, User } from 'discord.js';
import { Color } from '@miko/common';

@Injectable()
export class InformationCommands {
	public constructor(private readonly client: Client) {}

	@UserCommand('Get user avatar')
	public onUserAvatar(@Context() [interaction]: [ContextMenuInteraction], @Options('user') user: User) {
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
					.setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
					.setColor(Color.MAGENTA)
			],
			ephemeral: true
		});
	}

	@SlashCommand('help', 'Get useful links of Miko bot.')
	public onLinks(@Context() [interaction]: [CommandInteraction]) {
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('Useful links Miko')
					.setDescription(
						`🔗 [Invite Miko](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot%20applications.commands)\n` +
							'⚙ [Support server](https://discord.gg/zyeK4k3)'
					)
					.setColor(Color.MAGENTA)
			]
		});
	}
}
