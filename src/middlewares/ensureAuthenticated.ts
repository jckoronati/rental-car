import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '../modules/accounts/repositories/implementations/UserRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) throw new Error('Missing token');

  const [, token] = authorization.split(' ');

  try {
    const { sub: id } = verify(
      token,
      '693b595d2a2d05a5775fefef93c7b455',
    ) as IPayload;

    const userRepository = new UserRepository();
    const user = userRepository.findById(id);

    if (!user) throw new Error('User does not exists');

    next();
  } catch (error) {
    throw new Error('Invalid token');
  }
}
