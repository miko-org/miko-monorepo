import { Injectable } from '@nestjs/common';
import { TempChannelsConfigService } from '@miko/common';

@Injectable()
export class TempChannelsService {
	public constructor(private readonly tempChannelsConfigService: TempChannelsConfigService) {}
}
