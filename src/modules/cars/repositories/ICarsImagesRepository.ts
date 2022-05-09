import { CarsImages } from '../infra/typeorm/entities/CarsImages';

interface ICarsImagesRepository {
  create(car_id: string, name: string): Promise<CarsImages>;
}

export { ICarsImagesRepository };
