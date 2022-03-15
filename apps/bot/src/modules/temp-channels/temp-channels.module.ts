import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempChannelsConfigService } from '@miko/core';
import { TempChannelsCommands } from './temp-channels.commands';
import { TempChannelsService } from './temp-channels.service';
import { TempChannelsUpdate } from './temp-channels.update';
import { TempChannel } from './temp-channel.entity';

@Module({
	imports: [TypeOrmModule.forFeature([TempChannel, TempChannelsConfigService])],
	providers: [TempChannelsCommands, TempChannelsService, TempChannelsUpdate]
})
export class TempChannelsModule {}
