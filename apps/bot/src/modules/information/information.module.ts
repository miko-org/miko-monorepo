import { Module } from '@nestjs/common';
import { InformationCommands } from './information.commands';

@Module({
	providers: [InformationCommands],
	exports: [InformationCommands]
})
export class InformationModule {}
