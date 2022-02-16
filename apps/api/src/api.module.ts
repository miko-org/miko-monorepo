import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BloodTearsMiddleware } from './middlewares';
import helmet from 'helmet';

@Module({
	imports: []
})
export class ApiModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		return consumer.apply(helmet(), BloodTearsMiddleware).forRoutes();
	}
}
