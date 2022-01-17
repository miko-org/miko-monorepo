import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionsCommands } from './emotions.commands';
import { EmotionsService } from './emotions.service';
import { Emotion } from './emotion.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Emotion])],
	providers: [EmotionsService, EmotionsCommands]
})
export class EmotionsModule {}
