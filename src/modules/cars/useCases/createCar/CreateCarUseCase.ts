import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCarsDTO } from '../../dto/ICreateCarsDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarRepository')
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
