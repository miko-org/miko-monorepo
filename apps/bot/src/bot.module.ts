import { NecordModule } from 'necord';
import { HotShotsModule } from 'nestjs-hot-shots';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BotUpdate } from './bot.update';
import { BotMetrics } from './bot.metrics';
import { EmotionsModule, GeneralModule, ModerationModule, TempChannelsModule, WelcomeModule } from './modules';
import {
	BullConfigService,
	CacheConfigService,
	DatabaseConfigService,
	HotShotsConfigService,
	NecordConfigService,
	SentryConfigProvider
} from '@miko/common';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({ isGlobal: true, cache: true, ignoreEnvFile: true }),
		CacheModule.registerAsync({ isGlobal: true, useClass: CacheConfigService }),
		BullModule.forRootAsync({ useClass: BullConfigService }),
		TypeOrmModule.forRootAsync({ useClass: DatabaseConfigService }),
		NecordModule.forRootAsync({ useClass: NecordConfigService }),
		HotShotsModule.forRootAsync({ useClass: HotShotsConfigService }),
		EmotionsModule,
		GeneralModule,
		ModerationModule,
		TempChannelsModule,
		WelcomeModule
	],
	providers: [BotUpdate, BotMetrics, SentryConfigProvider]
})
export class BotModule {}
