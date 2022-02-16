import { Entity } from 'typeorm';
import { MemberEntity } from '@miko/common';

@Entity()
export class Punishment extends MemberEntity {}
