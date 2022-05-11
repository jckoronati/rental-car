import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';
import 'reflect-metadata';
import '../../container';
import '../../../../data-source';
import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError)
      return response.status(err.statusCode).json({ error: err.message });

    return response.status(500).json({
      status: 'error',
      error: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
