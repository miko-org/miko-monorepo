import { Module } from '@nestjs/common';
import { EmotionsCommands } from './emotions.commands';

@Module({ providers: [EmotionsCommands] })
export class EmotionsModule {}
