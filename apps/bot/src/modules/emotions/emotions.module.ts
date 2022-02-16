import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionCommand } from './emotion.command';
import { Emotion } from './emotion.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Emotion])],
	providers: [EmotionCommand]
})
export class EmotionsModule {}
