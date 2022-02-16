import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalUser } from './user.entity';

@Injectable()
export class UsersService {
	public constructor(
		@InjectRepository(LocalUser)
		private readonly usersRepository: Repository<LocalUser>
	) {}
}
