import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [MembersModule, UsersModule],
	providers: [],
	exports: []
})
export class CoreModule {}
