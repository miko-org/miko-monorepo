import { Injectable } from '@nestjs/common';
import { StatsD } from 'hot-shots';
import { Client, CommandInteraction } from 'discord.js';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Context, On } from 'necord';

@Injectable()
export class BotMetrics {
	public constructor(private readonly metrics: StatsD, private readonly client: Client) {}

	@On('interactionCreate')
	public getCommandExecution(@Context() [interaction]: [CommandInteraction]) {
		if (!interaction.isApplicationCommand()) return;

		this.metrics.increment('command.execution', {
			command: [
				interaction.commandName,
				interaction.options.getSubcommandGroup(false),
				interaction.options.getSubcommand(false)
			]
				.filter(Boolean)
				.join(' ')
		});
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getGuildCount() {
		this.metrics.gauge('guilds.size', this.client.guilds.cache.size);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getGuildMemberCount() {
		this.metrics.gauge(
			'members.size',
			this.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount)
		);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getUserCount() {
		this.metrics.gauge('users.size', this.client.users.cache.size);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getChannelCount() {
		const [text, voice] = this.client.channels.cache.partition(channel => channel.isText());
		this.metrics.gauge('channels.voice.size', voice.size);
		this.metrics.gauge('channels.text.size', text.size);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getEmojiCount() {
		this.metrics.gauge('emojis.size', this.client.emojis.cache.size);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getAveragePing() {
		this.metrics.gauge('latency', this.client.ws.ping);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getStatus() {
		this.metrics.gauge('status', this.client.ws.status);
	}
}
