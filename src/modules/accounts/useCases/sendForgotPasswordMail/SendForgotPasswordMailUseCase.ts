import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dayjsDateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string) {
    const timeToExpire = 3;

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const token = uuid();

    const expiresDate = this.dayjsDateProvider.addHours(timeToExpire);

    await this.userTokensRepository.create({
      expires_date: expiresDate,
      refresh_token: token,
      user_id: user.id,
    });

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para recuperar sua senha: ${token}`,
    );
  }
}

export { SendForgotPasswordMailUseCase };
