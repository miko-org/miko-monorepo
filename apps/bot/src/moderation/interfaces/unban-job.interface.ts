import { Job } from 'bull';

export interface UnbanJobData {
	guildId: string;
	memberId: string;
}

export type UnbanJob = Job<UnbanJobData>;
