import { Global, Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { EXCHANGE_MIKO_SHARDS, QUEUE_GUILD_INFO_REQUEST } from './communication.constants';

@Global()
@Module({
	imports: [
		RabbitMQModule.forRootAsync(RabbitMQModule, {
			useFactory: (configService: ConfigService) => ({
				uri: configService.get('RABBIT_MQ_URI', 'amqp://guest:guest@localhost:5672'),
				exchanges: [{ name: EXCHANGE_MIKO_SHARDS, type: 'topic' }]
			}),
			inject: [ConfigService]
		})
	],
	providers: [CommunicationService],
	exports: [CommunicationService]
})
export class CommunicationModule {}
