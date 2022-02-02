import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BloodTearsMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		res.header('x-powered-by', 'Blood, sweat, and tears.');
		next();
	}
}
