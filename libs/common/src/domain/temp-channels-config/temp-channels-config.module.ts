import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createCacheableDomainProvider } from '../../providers';
import { TempChannelsConfig } from './temp-channels-config.entity';
import { TempChannelsConfigService } from './temp-channels-config.service';

@Module({
	imports: [TypeOrmModule.forFeature([TempChannelsConfig])],
	providers: [TempChannelsConfigService, createCacheableDomainProvider('CACHEABLE_WELCOME_SETTINGS')],
	exports: [TempChannelsConfigService]
})
export class TempChannelsConfigModule {}
