import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NecordArgumentsHost } from 'necord';
import { CommonException } from '@miko/common';

@Catch(CommonException)
export class CommonExceptionFilter implements ExceptionFilter<CommonException> {
	public async catch(exception: CommonException, host: ArgumentsHost): Promise<any> {
		const necordHost = NecordArgumentsHost.create(host);
		const [interaction] = necordHost.getContext<'interactionCreate'>();
		const discovery = necordHost.getDiscovery();

		if (!interaction.isCommand()) {
			return true;
		}

		return interaction.reply({
			content: exception.message,
			ephemeral: true
		});
	}
}
