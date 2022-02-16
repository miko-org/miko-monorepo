import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageTemplate } from './message-template.entity';
import { MessageTemplatesService } from './message-templates.service';

@Module({
	imports: [TypeOrmModule.forFeature([MessageTemplate])],
	providers: [MessageTemplatesService],
	exports: [MessageTemplatesService]
})
export class MessageTemplatesModule {}
