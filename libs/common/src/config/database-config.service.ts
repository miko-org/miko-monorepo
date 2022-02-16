import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
	public constructor(private readonly configService: ConfigService) {}

	public createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.configService.get('POSTGRES_HOST', 'localhost'),
			port: this.configService.get('POSTGRES_PORT', 5432),
			database: this.configService.get('POSTGRES_DATABASE', 'postgres'),
			username: this.configService.get('POSTGRES_USERNAME', 'postgres'),
			password: this.configService.get('POSTGRES_PASSWORD', 'postgres'),
			synchronize: this.configService.get('NODE_ENV', 'development') === 'development',
			autoLoadEntities: true
		};
	}
}
