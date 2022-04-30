import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { AppDataSource } from './database/dataSource';
import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

AppDataSource.initialize()
  .then(async () => {
    console.log('Initilializing the databases');
  })
  .catch(err => console.log(err));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log('Server is running'));
