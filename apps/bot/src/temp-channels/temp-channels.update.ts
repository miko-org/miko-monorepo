import { Injectable } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { TempChannelsService } from './temp-channels.service';

@Injectable()
export class TempChannelsUpdate {
	public constructor(private readonly tempChannelsService: TempChannelsService) {}

	@On('voiceChannelSwitch')
	public onVoiceChannelSwitch(@Context() [member, channel]: ContextOf<'voiceChannelSwitch'>) {}

	@On('voiceChannelJoin')
	public onVoiceChannelJoin(@Context() [member, channel]: ContextOf<'voiceChannelJoin'>) {}

	@On('voiceChannelLeave')
	public onVoiceChannelLeave(@Context() [member, channel]: ContextOf<'voiceChannelLeave'>) {}
}
