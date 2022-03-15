import { UserEntity } from '@miko/common';
import { Repository } from 'typeorm';

export abstract class UserRepository<T extends UserEntity> extends Repository<T> {
	public abstract findByUserId(userId: string): Promise<T>;
}
