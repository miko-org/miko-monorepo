import { Entity } from 'typeorm';
import { BaseEntity } from '@miko/common';

@Entity({ name: 'message_template' })
export class MessageTemplate extends BaseEntity {
	public static readonly URL_MAX_LENGTH = 2000;

	public static readonly TITLE_MAX_LENGTH = 256;

	public static readonly VALUE_MAX_LENGTH = 2000;
}
