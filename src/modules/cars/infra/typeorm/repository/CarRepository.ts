import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../../data-source';
import { ICreateCarsDTO } from '../../../dto/ICreateCarsDTO';
import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true });

    if (brand) carsQuery.andWhere('cars.brand = :brand', { brand });

    if (category_id)
      carsQuery.andWhere('cars.category_id = :category_id', { category_id });

    if (name) carsQuery.andWhere('cars.name = :name', { name });

    const cars = await carsQuery.getMany();

    return cars;
  }

  async listAllAvailable(): Promise<Car[]> {
    throw new Error('Method not implemented.');
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({ license_plate });

    return car;
  }
}

export { CarRepository };
