import { EntityRepository } from 'typeorm';
import { WelcomeConfig } from './index';
import { CoreService } from '../core.service';

@EntityRepository(WelcomeConfig)
export class WelcomeConfigService extends CoreService<WelcomeConfig> {
	protected createNew(guildId: string): WelcomeConfig {
		return this.create({
			guildId
		});
	}

	existsByGuildId(guildId: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	findAllByGuildId(guildId: string): Promise<WelcomeConfig[]> {
		return Promise.resolve([]);
	}
}
