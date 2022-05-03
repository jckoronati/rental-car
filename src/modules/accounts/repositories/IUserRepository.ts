import { ICreateUserDTO } from '../dto/ICreateUserDTO';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUserRepository };
