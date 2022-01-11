import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, On, Once } from 'necord';

@Injectable()
export class BotUpdate {
	private readonly logger = new Logger(BotUpdate.name);

	@Once('ready')
	public onReady(@Context() [client]: ContextOf<'ready'>) {
		this.logger.log(`Client is ready! Serving ${client.guilds.cache.size} guilds`);
	}

	@Once('shardReady')
	public onShardReady(@Context() [shardId, unavailableGuilds]: ContextOf<'shardReady'>) {
		this.logger.log(`Shard ${shardId} is ready, ${unavailableGuilds?.size ?? 0} unavailable guilds`);
	}

	@On('shardDisconnect')
	public onShardDisconnect(@Context() [closeEvent, shardId]: ContextOf<'shardDisconnect'>) {
		this.logger.log(`Shard ${shardId} was disconnected: ${closeEvent}`);
	}

	@On('shardReconnecting')
	public onShardReconnecting(@Context() [shardId]: ContextOf<'shardReconnecting'>) {
		this.logger.log(`Shard ${shardId} is reconnecting`);
	}

	@On('shardResume')
	public onShardResume(@Context() [shardId, replayedEvents]: ContextOf<'shardResume'>) {
		this.logger.log(`Shard ${shardId} has resumed with ${replayedEvents} replayed events`);
	}

	@On('guildUnavailable')
	public onGuildUnavailable(@Context() [guild]: ContextOf<'guildUnavailable'>) {
		this.logger.log(`Guild ${guild.name ?? guild.id} is unavailable now`);
	}
}
