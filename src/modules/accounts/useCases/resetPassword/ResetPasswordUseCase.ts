import { inject } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ password, token }: IRequest) {
    const userToken = this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) throw new AppError('Invalid token!');
  }
}
