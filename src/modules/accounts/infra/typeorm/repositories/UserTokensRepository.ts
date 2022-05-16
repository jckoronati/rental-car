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

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOneBy({ refresh_token });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserId(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOneBy({
      user_id,
      refresh_token,
    });

    return userToken;
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
