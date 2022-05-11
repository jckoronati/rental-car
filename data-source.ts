import { DataSource } from 'typeorm';

import { User } from './src/modules/accounts/infra/typeorm/entities/User';
import { Car } from './src/modules/cars/infra/typeorm/entities/Car';
import { CarsImages } from './src/modules/cars/infra/typeorm/entities/CarsImages';
import { Category } from './src/modules/cars/infra/typeorm/entities/Category';
import { Specification } from './src/modules/cars/infra/typeorm/entities/Specification';
import { Rentals } from './src/modules/rentals/infra/typeorm/entities/Rentals';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentalcar',
  entities: [Category, Specification, User, Car, CarsImages, Rentals],
  migrations: ['./src/database/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Initilializing database connection');
  })
  .catch(err =>
    console.log('Error during process Data Source Initialization', err),
  );
