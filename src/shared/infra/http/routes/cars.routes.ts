import { Router } from 'express';

import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { ListCarsController } from '../../../../modules/cars/useCases/listCars/ListCarsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureUserIsAdmin';

const carRoute = Router();

const createCarController = new CreateCarController();
const listCarsAvailable = new ListCarsController();

carRoute.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carRoute.get('/available', listCarsAvailable.handle);

export { carRoute };
