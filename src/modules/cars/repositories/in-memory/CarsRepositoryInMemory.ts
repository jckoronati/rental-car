import { ICreateCarsDTO } from '../../dto/ICreateCarsDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    category_id,
    daily_rate,
    available,
    brand,
    description,
    fine_amount,
    license_plate,
    name,
    id,
  }: ICreateCarsDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      category_id,
      daily_rate,
      available,
      brand,
      description,
      fine_amount,
      license_plate,
      name,
      id,
    });

    this.cars.push(car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === license_plate);

    return car;
  }
}

export { CarsRepositoryInMemory };
