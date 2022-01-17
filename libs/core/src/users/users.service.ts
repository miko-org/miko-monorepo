import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LocalUser } from './local-user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
	public constructor(
		@InjectRepository(LocalUser)
		private readonly usersRepository: Repository<LocalUser>
	) {}
}
