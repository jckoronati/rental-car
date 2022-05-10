import { ICreateRentalDTO } from '../../dto/ICreateRentalDTO';
import { Rentals } from '../../infra/typeorm/entities/Rentals';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rentals[] = [];

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rentals> {
    const rental = new Rentals();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rentals> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rentals> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }
}

export { RentalsRepositoryInMemory };
