import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../data-source';
import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
    username,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      username,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };