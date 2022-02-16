import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempChannelsConfig } from './temp-channels-config.entity';
import { TempChannelsConfigService } from './temp-channels-config.service';

@Module({
	imports: [TypeOrmModule.forFeature([TempChannelsConfig])],
	providers: [TempChannelsConfigService],
	exports: [TempChannelsConfigService]
})
export class TempChannelsConfigModule {}
