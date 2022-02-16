import { Job } from 'bull';

export interface UnMuteJobData {
	guildId: string;
	memberId: string;
	roleId: string;
}

export type UnmuteJob = Job<UnMuteJobData>;
