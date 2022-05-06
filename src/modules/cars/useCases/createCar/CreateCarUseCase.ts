import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCarsDTO } from '../../dto/ICreateCarsDTO';
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
    available,
    brand,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    category_id,
    id,
  }: ICreateCarsDTO): Promise<void> {
    const carLicensePlateAlreadyInUse =
      await this.carsRepository.findByLicensePlate(license_plate);

    if (carLicensePlateAlreadyInUse)
      throw new AppError('License plate already in use');

    await this.carsRepository.create({
      available,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      category_id,
      id,
    });
  }
}

export { CreateCarUseCase };
