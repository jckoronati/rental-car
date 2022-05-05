import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../../../../errors/AppError';
import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UserRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('Missing token', 401);

  const [, token] = authorization.split(' ');

  try {
    const { sub: id } = verify(
      token,
      '693b595d2a2d05a5775fefef93c7b455',
    ) as IPayload;

    const userRepository = new UserRepository();
    const user = userRepository.findById(id);

    if (!user) throw new AppError('User does not exists', 401);

    request.user = {
      id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
