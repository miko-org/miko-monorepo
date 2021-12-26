import { Injectable } from '@nestjs/common';
import { StatsD } from 'hot-shots';
import { Client, CommandInteraction } from 'discord.js';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Context, On } from 'necord';

@Injectable()
export class BotMetrics {
	public constructor(private readonly metrics: StatsD, private readonly client: Client) {}

	@On('interactionCreate')
	public getCommandExecution(@Context() interaction: CommandInteraction) {
		if (!interaction.isApplicationCommand()) return;

		this.metrics.increment('command.execution', {
			command: [
				interaction.options.getSubcommandGroup(false),
				interaction.options.getSubcommand(false),
				interaction.commandName
			]
				.filter(x => !!x)
				.join(' ')
		});
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getGuildCount() {
		return this.metrics.gauge('discord.guilds', this.client.guilds.cache.size);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getGuildMemberCount() {
		this.metrics.gauge(
			'discord.members',
			this.client.guilds.cache.reduce((acc, guild) => {
				acc += guild.memberCount;
				return acc;
			}, 0)
		);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getUserCount() {
		return this.metrics.gauge('discord.users', this.client.users.cache.size);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getChannelCount() {
		const [text, voice] = this.client.channels.cache.partition(channel => channel.isText());
		this.metrics.gauge('discord.channels.voice', voice.size);
		this.metrics.gauge('discord.channels.text', text.size);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getEmojiCount() {
		return this.metrics.gauge('discord.emojis', this.client.emojis.cache.size);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getAveragePing() {
		return this.metrics.gauge('discord.latency', this.client.ws.ping);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getStatus() {
		return this.metrics.gauge('discord.status', this.client.ws.status);
	}

	@Cron(CronExpression.EVERY_30_SECONDS)
	public getUptime() {
		return this.metrics.gauge('discord.uptime', this.client.uptime);
	}
}
