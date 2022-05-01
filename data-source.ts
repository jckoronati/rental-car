import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 8888,
  username: 'docker',
  password: 'ignite',
  database: 'rentalcar',
  entities: [],
  migrations: [],
  migrationsTableName: 'migration_table',
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Initilializing the databases');
  })
  .catch(err =>
    console.log('Error during process Data Source Initialization', err),
  );
