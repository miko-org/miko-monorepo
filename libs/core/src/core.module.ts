import { Module } from '@nestjs/common';
import { MembersModule } from './members';
import { UsersModule } from './users';

@Module({
	imports: [MembersModule, UsersModule]
})
export class CoreModule {}
