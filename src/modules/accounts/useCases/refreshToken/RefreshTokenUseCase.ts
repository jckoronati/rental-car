import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { sub, email } = verify(token, auth.secretRefreshToken) as IPayload;

    const userToken = await this.userTokensRepository.findByUserId(sub, token);

    if (!userToken) throw new AppError('Refresh token Error!');

    await this.userTokensRepository.deleteById(userToken.id);

    const refreshTokenExpiresDate = this.dayjsDateProvider.addDays(
      auth.expiresRefreshTokenDays,
    );

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: sub,
      expiresIn: auth.expiresRefreshTokenDays,
    });

    await this.userTokensRepository.create({
      expires_date: refreshTokenExpiresDate,
      user_id: sub,
      refresh_token: refreshToken,
    });

    const newToken = sign({}, auth.secretToken, {
      subject: sub,
      expiresIn: auth.expiresIn,
    });

    return {
      refreshToken,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
