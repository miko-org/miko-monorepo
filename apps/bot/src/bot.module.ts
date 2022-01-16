import type { RedisOptions } from 'ioredis';
import * as ioredisStore from 'cache-manager-ioredis';
import { NecordModule } from 'necord';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotShotsModule } from 'nestjs-hot-shots';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotUpdate } from './bot.update';
import { InformationModule } from './information/information.module';
import { EmotionsModule } from './emotions/emotions.module';
import { ModerationModule } from './moderation/moderation.module';
import { TempChannelsModule } from './temp-channels/temp-channels.module';
import { WelcomeModule } from './welcome/welcome.module';
import { BotMetrics } from './bot.metrics';
import { CommunicationModule } from '@miko/communication';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, cache: true, ignoreEnvFile: true }),
		CommunicationModule,
		CacheModule.registerAsync<RedisOptions>({
			isGlobal: true,
			useFactory: (configService: ConfigService) => ({
				store: ioredisStore,
				host: configService.get('REDIS_HOST', 'localhost'),
				port: configService.get('REDIS_PORT', 6379),
				username: configService.get('REDIS_USERNAME'),
				password: configService.get('REDIS_PASSWORD')
			}),
			inject: [ConfigService]
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('POSTGRES_HOST', 'localhost'),
				port: configService.get('POSTGRES_PORT', 5432),
				database: configService.get('POSTGRES_DATABASE', 'postgres'),
				username: configService.get('POSTGRES_USERNAME', 'postgres'),
				password: configService.get('POSTGRES_PASSWORD', 'postgres'),
				synchronize: configService.get('NODE_ENV', 'development') === 'development',
				autoLoadEntities: true
			})
		}),
		NecordModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				token: configService.get('DISCORD_TOKEN'),
				intents: [
					'GUILD_BANS',
					'GUILDS',
					'GUILD_MESSAGES',
					'DIRECT_MESSAGES',
					'GUILD_VOICE_STATES',
					'GUILD_MEMBERS'
				],
				presence: {
					activities: [
						{
							name: 'https://miko.bot | /help',
							type: 'WATCHING',
							url: 'https://miko.bot'
						}
					]
				}
			}),
			inject: [ConfigService]
		}),
		HotShotsModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				mock: configService.get('NODE_ENV', 'development') === 'development',
				host: configService.get('STATSD_HOST', 'localhost'),
				port: configService.get('STATSD_PORT', 8125),
				prefix: 'miko.',
				sampleRate: 1,
				globalTags: {
					env: configService.get('NODE_ENV', 'development')
				},
				errorHandler: err => Logger.error(err, HotShotsModule.name)
			}),
			inject: [ConfigService]
		}),
		ScheduleModule.forRoot(),
		ConfigModule,
		EmotionsModule,
		ModerationModule,
		InformationModule,
		TempChannelsModule,
		WelcomeModule
	],
	providers: [BotUpdate, BotMetrics]
})
export class BotModule {}
