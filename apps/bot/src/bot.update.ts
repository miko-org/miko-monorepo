import { Injectable, Logger } from '@nestjs/common';
import { Context, On, Once } from 'necord';
import { Client, CloseEvent, Guild, Snowflake } from 'discord.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotUpdate {
	private readonly logger = new Logger(BotUpdate.name);

	public constructor(private readonly client: Client) {}

	@Once('ready')
	public onReady(@Context() context: any) {
		this.logger.log(`Client is ready! Serving ${this.client.guilds.cache.size} guilds`);

		this.client.user.setActivity({
			name: 'https://miko.bot | /help',
			type: 'WATCHING',
			url: 'https://miko.bot'
		});
	}

	@Once('shardReady')
	public onShardReady(@Context() [shardId, unavailableGuilds]: [number, Set<Snowflake>]) {
		this.logger.log(`Shard ${shardId} is ready, ${unavailableGuilds?.size ?? 0} unavailable guilds`);
	}

	@On('shardDisconnect')
	public onShardDisconnect(@Context() [closeEvent, shardId]: [CloseEvent, number]) {
		this.logger.log(`Shard ${shardId} was disconnected: ${closeEvent}`);
	}

	@On('shardReconnecting')
	public onShardReconnecting(@Context() shardId: number) {
		this.logger.log(`Shard ${shardId} is reconnecting`);
	}

	@On('shardResume')
	public onShardResume(@Context() [shardId, replayedEvents]: [number, number]) {
		this.logger.log(`Shard ${shardId} has resumed with ${replayedEvents} replayed events`);
	}

	@On('guildUnavailable')
	public onGuildUnavailable(@Context() guild: Guild) {
		this.logger.log(`Guild ${guild.name ?? guild.id} is unavailable now`);
	}
}
