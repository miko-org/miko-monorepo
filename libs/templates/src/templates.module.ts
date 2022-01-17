import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './template.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Template])],
	providers: [TemplatesService],
	exports: [TemplatesService]
})
export class TemplatesModule {}
