import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ContextOf, NecordArgumentsHost, NecordException } from 'necord';

@Catch(NecordException)
export class NecordExceptionFilter implements ExceptionFilter<NecordException> {
	public async catch(exception: NecordException, host: ArgumentsHost): Promise<any> {
		const necordHost = NecordArgumentsHost.create(host);
		const [interaction] = necordHost.getContext<ContextOf<'interactionCreate'>>();

		return interaction.isApplicationCommand() && interaction.reply(exception.message);
	}
}
