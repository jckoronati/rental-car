import { IUserTokenDTO } from '../dto/IUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUserTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: IUserTokenDTO): Promise<UserTokens>;
}

export { IUserTokensRepository };
