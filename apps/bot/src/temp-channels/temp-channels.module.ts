import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempChannelsConfigModule } from '@miko/common';
import { TempChannelsCommands } from './temp-channels.commands';
import { TempChannelsService } from './temp-channels.service';
import { TempChannelsUpdate } from './temp-channels.update';
import { TempChannel } from './temp-channel.entity';

@Module({
	imports: [TypeOrmModule.forFeature([TempChannel]), TempChannelsConfigModule],
	providers: [TempChannelsCommands, TempChannelsService, TempChannelsUpdate]
})
export class TempChannelsModule {}
