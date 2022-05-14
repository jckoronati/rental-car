import { ICreateRentalDTO } from '../dto/ICreateRentalDTO';
import { Rentals } from '../infra/typeorm/entities/Rentals';

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rentals>;
  findOpenRentalByUser(user_id: string): Promise<Rentals>;
  create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rentals>;
  findById(id: string): Promise<Rentals>;
  findByUser(user_id: string): Promise<Rentals[]>;
}

export { IRentalsRepository };
