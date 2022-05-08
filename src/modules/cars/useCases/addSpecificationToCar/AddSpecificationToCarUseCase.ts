import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  car_id: string;
  specification_id: string[];
}

// @injectable()
class AddSpecificationToCarUseCase {
  constructor(
    // @inject('CarRepository')
    private carRepository: ICarsRepository,
  ) {}

  async execute({ car_id, specification_id }: IRequest): Promise<void> {
    const carExists = await this.carRepository.findById(car_id);

    if (!carExists) throw new AppError('Car does not exist!');
  }
}

export { AddSpecificationToCarUseCase };
