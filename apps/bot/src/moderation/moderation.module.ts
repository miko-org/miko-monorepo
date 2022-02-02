import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationCommands } from './moderation.commands';
import { ModerationProcessor } from './moderation.processor';
import { BullModule } from '@nestjs/bull';
import { ModerationUpdate } from './moderation.update';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'moderation',
			defaultJobOptions: {
				attempts: 3,
				backoff: {
					type: 'exponential',
					delay: 60 * 1000
				}
			}
		})
	],
	providers: [ModerationService, ModerationCommands, ModerationProcessor, ModerationUpdate]
})
export class ModerationModule {}
