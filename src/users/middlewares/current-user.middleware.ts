import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from '../users.service';
// import { User } from '../user.entity';

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace Express {
//     interface Request {
//       currentUser?: User;
//     }
//   }
// }

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req.currentUser = user;
    }

    next();
  }
}
