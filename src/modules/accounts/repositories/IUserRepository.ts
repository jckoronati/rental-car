import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import { User } from '../entities/User';

interface IUserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUserRepository };
