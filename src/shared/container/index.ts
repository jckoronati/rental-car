import { container } from 'tsyringe';

import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '../../modules/accounts/repositories/IUserRepository';
import { CarRepository } from '../../modules/cars/infra/typeorm/repository/CarRepository';
import { CarsImagesRepository } from '../../modules/cars/infra/typeorm/repository/CarsImagesRepository';
import { CategoryRepository } from '../../modules/cars/infra/typeorm/repository/CategoryRepository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repository/SpecificationRepository';
import { ICarsImagesRepository } from '../../modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { ICategoryRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalRepository';
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository';

import './providers/index';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarsRepository>('CarRepository', CarRepository);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);
