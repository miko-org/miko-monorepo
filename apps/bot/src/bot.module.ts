import { CacheModule, Logger, Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotUpdate } from './bot.update';
import { UtilsModule } from './utils/utils.module';
import { EmotionsModule } from './emotions/emotions.module';
import { ModerationModule } from './moderation/moderation.module';
import { VoiceModule } from './voice/voice.module';
import { WelcomeModule } from './welcome/welcome.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotMetrics } from './bot.metrics';
import { HotShotsModule } from 'nestjs-hot-shots';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		CacheModule.register({ isGlobal: true }),
		ConfigModule.forRoot({ isGlobal: true, cache: true, ignoreEnvFile: true }),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('POSTGRES_HOST', 'localhost'),
				port: configService.get('POSTGRES_PORT', 5432),
				database: configService.get('POSTGRES_DATABASE', 'postgres'),
				username: configService.get('POSTGRES_USERNAME', 'postgres'),
				password: configService.get('POSTGRES_PASSWORD'),
				synchronize: configService.get('NODE_ENV', 'development') === 'development',
				autoLoadEntities: true
			})
		}),
		NecordModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				token: configService.get('DISCORD_TOKEN'),
				registerApplicationCommands: configService.get('DISCORD_DEV_GUILD', true),
				intents: [
					'GUILD_BANS',
					'GUILDS',
					'GUILD_MESSAGES',
					'DIRECT_MESSAGES',
					'GUILD_VOICE_STATES',
					'GUILD_MEMBERS'
				]
			}),
			inject: [ConfigService]
		}),
		HotShotsModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				// mock: configService.get('NODE_ENV', 'development') === 'development',
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
		UtilsModule,
		VoiceModule,
		WelcomeModule
	],
	providers: [BotUpdate, BotMetrics]
})
export class BotModule {}
