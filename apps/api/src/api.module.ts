import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { BloodTearsMiddleware } from '@miko/common';
import helmet from 'helmet';

@Module({
	imports: [],
	controllers: [ApiController],
	providers: [ApiService]
})
export class ApiModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		return consumer.apply(helmet(), BloodTearsMiddleware).forRoutes();
	}
}
