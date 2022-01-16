import { Module } from '@nestjs/common';
import { createCacheableDomainProvider } from '@miko/common/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WelcomeConfig } from './welcome-config.entity';
import { WelcomeConfigService } from './welcome-config.service';

@Module({
	imports: [TypeOrmModule.forFeature([WelcomeConfig])],
	providers: [WelcomeConfigService, createCacheableDomainProvider('CACHEABLE_WELCOME_SETTINGS')],
	exports: [WelcomeConfigService]
})
export class WelcomeConfigModule {}
