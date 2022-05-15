import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../../data-source';
import { IUserTokenDTO } from '../../../dto/IUserTokenDTO';
import { IUserTokensRepository } from '../../../repositories/IUserTokensRepository';
import { UserTokens } from '../entities/UserTokens';

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens);
  }

  async findByUserId(user_id: string): Promise<UserTokens[]> {
    const tokens = await this.repository.find({
      where: { user_id },
    });

    return tokens;
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: IUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UserTokensRepository };
