import { Module } from '@nestjs/common';
import { ConfigCommands } from './config.commands';

@Module({
	providers: [ConfigCommands]
})
export class ConfigModule {}
