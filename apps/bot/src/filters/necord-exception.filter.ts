import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ContextOf, NecordArgumentsHost, NecordException, NecordInfoType } from 'necord';

@Catch(NecordException)
export class NecordExceptionFilter implements ExceptionFilter<NecordException> {
	public async catch(exception: NecordException, host: ArgumentsHost): Promise<any> {
		const necordHost = NecordArgumentsHost.create(host);
		const [interaction] = necordHost.getContext<ContextOf<'interactionCreate'>>();
		const { type } = necordHost.getInfo();

		if (!interaction.isCommand()) {
			return true;
		}

		return (
			type === NecordInfoType.SLASH_COMMANDS &&
			interaction.reply({
				content: exception.message,
				ephemeral: true
			})
		);
	}
}
