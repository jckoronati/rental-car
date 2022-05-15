import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UserRepository';
import { UserTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  const userTokensRepository = new UserTokensRepository();

  if (!authorization) throw new AppError('Missing token', 401);

  const [, token] = authorization.split(' ');

  try {
    const { sub: id } = verify(token, auth.secretRefreshToken) as IPayload;

    const userToken = await userTokensRepository.findByUserId(id, token);

    if (!userToken) throw new AppError('User does not exists', 401);

    request.user = {
      id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
