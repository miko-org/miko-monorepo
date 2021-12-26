import { Module } from '@nestjs/common';
import { VoiceCommands } from './voice.commands';
import { VoiceService } from './voice.service';
import { VoiceUpdate } from './voice.update';

@Module({
	providers: [VoiceCommands, VoiceService, VoiceUpdate]
})
export class VoiceModule {}
