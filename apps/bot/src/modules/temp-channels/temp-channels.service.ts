import { Injectable } from '@nestjs/common';
import { TempChannelsConfigService } from '@miko/core';

@Injectable()
export class TempChannelsService {
	public constructor(private readonly tempChannelsConfigService: TempChannelsConfigService) {}
}
