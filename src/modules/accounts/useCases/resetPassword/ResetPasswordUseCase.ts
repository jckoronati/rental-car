import { hash } from 'bcryptjs';
import { inject } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) throw new AppError('Invalid token!');

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Expired token!');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User not found');

    user.password = await hash(password, 8);

    await this.userRepository.create(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
