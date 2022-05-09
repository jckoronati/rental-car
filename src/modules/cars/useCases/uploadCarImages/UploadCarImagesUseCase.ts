import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '../../repositories/ICarsImagesRepository';

interface IRequest {
  car_id: string;
  name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, name }: IRequest): Promise<void> {
    name.map(async name => this.carsImagesRepository.create(car_id, name));
  }
}

export { UploadCarImagesUseCase };
