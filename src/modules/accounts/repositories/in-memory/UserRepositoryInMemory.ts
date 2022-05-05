import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUserRepository } from '../IUserRepository';

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async create({
    driver_license,
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      password,
      name,
    });

    this.users.push(user);
  }
}

export { UserRepositoryInMemory };
