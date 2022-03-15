import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { CoreService } from '../core.service';
import { TempChannelsConfig } from './temp-channels-config.entity';

@EntityRepository(TempChannelsConfig)
export class TempChannelsConfigService extends CoreService<TempChannelsConfig> {
	protected createNew(guildId: string): TempChannelsConfig {
		return this.create({
			guildId
		});
	}

	existsByGuildId(guildId: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	findAllByGuildId(guildId: string): Promise<TempChannelsConfig[]> {
		return Promise.resolve([]);
	}
}
