import { Module } from '@nestjs/common';
import { WelcomeCommands } from './welcome.commands';
import { WelcomeUpdate } from './welcome.update';
import { WelcomeConfigService } from '@miko/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([WelcomeConfigService])],
	providers: [WelcomeUpdate, WelcomeCommands]
})
export class WelcomeModule {}
