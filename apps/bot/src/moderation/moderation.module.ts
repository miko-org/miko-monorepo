import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationCommands } from './moderation.commands';

@Module({ providers: [ModerationService, ModerationCommands] })
export class ModerationModule {}
