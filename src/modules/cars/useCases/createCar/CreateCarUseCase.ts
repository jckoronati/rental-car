import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCarsDTO } from '../../dto/ICreateCarsDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  id: string;
}

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    brand,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    category_id,
  }: ICreateCarsDTO): Promise<Car> {
    const carLicensePlateAlreadyInUse =
      await this.carsRepository.findByLicensePlate(license_plate);

    if (carLicensePlateAlreadyInUse)
      throw new AppError('License plate already in use');

    const car = await this.carsRepository.create({
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
