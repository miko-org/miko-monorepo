import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LocalMember } from './member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembersService {
	public constructor(
		@InjectRepository(LocalMember)
		private readonly localMembersRepository: Repository<LocalMember>
	) {}
}
