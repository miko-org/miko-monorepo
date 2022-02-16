import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(ApiModule);
	const configService = app.get(ConfigService);

	await app.listen(3000);
}

bootstrap();
