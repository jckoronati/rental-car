import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../../data-source';
import { ICreateUserDTO } from '../../../dto/ICreateUserDTO';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { User } from '../entities/User';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }

  async create({
    name,
    email,
    driver_license,
    password,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };
