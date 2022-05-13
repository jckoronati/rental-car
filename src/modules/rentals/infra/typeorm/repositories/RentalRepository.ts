import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../../data-source';
import { ICreateRentalDTO } from '../../../dto/ICreateRentalDTO';
import { IRentalsRepository } from '../../../repositories/IRentalsRepository';
import { Rentals } from '../entities/Rentals';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rentals>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rentals);
  }

  async findById(id: string): Promise<Rentals> {
    const rental = await this.repository.findOneBy({ id });

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rentals> {
    const car = await this.repository.findOneBy({ car_id });

    return car;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rentals> {
    const user = await this.repository.findOneBy({ user_id });

    return user;
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    amount,
  }: ICreateRentalDTO): Promise<Rentals> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      amount,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
