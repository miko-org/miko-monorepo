import { Injectable } from '@nestjs/common';

export enum Color {
	Blurple = '#5865F2',
	Green = '#57F287',
	Yellow = '#FEE75C',
	Fuchsia = '#EB459E',
	Red = '#ED4245',
	White = '#FFFFFF',
	Black = '#000000',
	Grey = '#4f545c'
}

@Injectable()
export class MessageService {}
