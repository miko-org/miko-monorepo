import { SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Bull from 'bull';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
	public constructor(private readonly configService: ConfigService) {}

	public createSharedConfiguration(): Bull.QueueOptions {
		return {
			redis: {
				host: this.configService.get('REDIS_HOST', 'localhost'),
				port: this.configService.get('REDIS_PORT', 6379),
				username: this.configService.get('REDIS_USERNAME'),
				password: this.configService.get('REDIS_PASSWORD')
			},
			settings: {
				lockDuration: 300000,
				stalledInterval: 300000
			}
		};
	}
}
