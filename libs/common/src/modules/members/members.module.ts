import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersService } from './members.service';
import { LocalMember } from './member.entity';

@Module({
	imports: [TypeOrmModule.forFeature([LocalMember])],
	providers: [MembersService],
	exports: [MembersService]
})
export class MembersModule {}
