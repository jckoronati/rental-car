import { DataSource } from 'typeorm';

import { Category } from './src/modules/cars/entities/Category';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentalcar',
  entities: [Category],
  migrations: ['./src/database/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Initilializing the databases');
  })
  .catch(err =>
    console.log('Error during process Data Source Initialization', err),
  );
