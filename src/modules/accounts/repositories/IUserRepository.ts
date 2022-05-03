import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import { User } from '../entities/User';

interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUserRepository };
