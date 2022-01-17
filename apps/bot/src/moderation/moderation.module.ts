import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationCommands } from './moderation.commands';
import { ModerationProcessor } from './moderation.processor';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [BullModule.registerQueue({ name: 'moderation' })],
	providers: [ModerationService, ModerationCommands, ModerationProcessor]
})
export class ModerationModule {}
