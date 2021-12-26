import { Injectable } from '@nestjs/common';
import { CommandGroup } from 'necord';

@CommandGroup({ name: 'voice', description: 'Temp Channels Module' })
export class VoiceCommands {}
