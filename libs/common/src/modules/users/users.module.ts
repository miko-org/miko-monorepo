import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalUser } from './user.entity';
import { UsersService } from './users.service';

@Module({
	imports: [TypeOrmModule.forFeature([LocalUser])],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
