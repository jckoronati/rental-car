import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../../../../config/auth';
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

  if (!authorization) throw new AppError('Missing token', 401);

  const [, token] = authorization.split(' ');

  try {
    const { sub: id } = verify(token, auth.secretToken) as IPayload;

    request.user = {
      id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
