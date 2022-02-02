import { Guild, Permissions } from 'discord.js';
import util from 'util';

export class DiscordUtil {
	private static readonly DEFAULT_AVATAR_URL = 'https://cdn.discordapp.com/embed/avatars/%s.png';

	private static readonly CHANNEL_WRITE_PERMISSIONS = new Permissions([
		'SEND_MESSAGES',
		'EMBED_LINKS',
		'READ_MESSAGE_HISTORY'
	]);

	private constructor() {
		// NO-OP
	}

	public static getDefaultWriteableChannel(guild: Guild) {
		const self = guild.me;
		const channel = guild.systemChannel;

		if (channel && channel.permissionsFor(self).has(this.CHANNEL_WRITE_PERMISSIONS)) {
			return channel;
		}

		return guild.channels.cache.find(
			ch => ch.isText() && ch.permissionsFor(self).has(this.CHANNEL_WRITE_PERMISSIONS)
		);
	}

	public static maskPublicMentions(value: string) {
		if (!value) {
			return;
		}

		value = value.replace('@everyone', '@\u2063everyone');
		value = value.replace('@here', '@\u2063here');
		return value;
	}

	public static getDefaultAvatarUrl(discriminator: string | number) {
		return util.format(this.DEFAULT_AVATAR_URL, Number(discriminator) % 5);
	}
}
