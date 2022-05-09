import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../../data-source';
import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository';
import { CarsImages } from '../entities/CarsImages';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarsImages>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarsImages);
  }

  async create(car_id: string, name: string): Promise<CarsImages> {
    const carImage = this.repository.create({
      car_id,
      name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
