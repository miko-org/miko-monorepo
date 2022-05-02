import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TempChannelsService } from "./temp-channels.service";
import { NecordExecutionContext } from "necord";

@Injectable()
export class TempChannelOwnerGuard implements CanActivate {
	public constructor(private readonly tempChannelsService: TempChannelsService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const necordContext = NecordExecutionContext.create(context);
		const interaction = necordContext.getContext<'interactionCreate'>();

		return undefined;
	}
}
