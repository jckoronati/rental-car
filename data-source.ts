import { DataSource } from 'typeorm';

import { Category } from './src/modules/cars/entities/Category';
import { Specification } from './src/modules/cars/entities/Specification';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentalcar',
  entities: [Category, Specification],
  migrations: ['./src/database/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Initilializing database connection');
  })
  .catch(err =>
    console.log('Error during process Data Source Initialization', err),
  );
