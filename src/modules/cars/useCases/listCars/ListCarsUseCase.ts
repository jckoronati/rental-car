import { inject, injectable } from 'tsyringe';

import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject('CarRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable(
      brand,
      category_id,
      name,
    );

    return cars;
  }
}

export { ListCarsUseCase };
