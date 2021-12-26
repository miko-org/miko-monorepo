import { Module } from '@nestjs/common';
import { UtilsCommands } from './utils.commands';

@Module({
	providers: [UtilsCommands]
})
export class UtilsModule {}
