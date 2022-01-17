import { Module } from '@nestjs/common';
import { WelcomeCommands } from './welcome.commands';
import { WelcomeUpdate } from './welcome.update';
import { WelcomeConfigModule } from '@miko/core';

@Module({
	imports: [WelcomeConfigModule],
	providers: [WelcomeUpdate, WelcomeCommands]
})
export class WelcomeModule {}
