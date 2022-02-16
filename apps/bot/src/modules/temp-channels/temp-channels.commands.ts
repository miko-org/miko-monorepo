import { SlashCommand, SlashGroup } from 'necord';
import { TempChannelsService } from './temp-channels.service';

@SlashGroup('voice', 'Temp Channels Module')
export class TempChannelsCommands {
	public constructor(private readonly tempChannelsService: TempChannelsService) {}

	@SlashCommand('enable', 'Create Manager channel for Temp Channels')
	public onEnable() {}

	@SlashCommand('admin', 'Add or delete admin permissions for user')
	public onAdmin() {}
}
