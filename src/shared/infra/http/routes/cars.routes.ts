import { Router } from 'express';

import { AddSpecificationToCarController } from '../../../../modules/cars/useCases/addSpecificationToCar/AddSpecificationToCarController';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { ListCarsController } from '../../../../modules/cars/useCases/listCars/ListCarsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureUserIsAdmin';

const carRoute = Router();

const createCarController = new CreateCarController();
const listCarsAvailable = new ListCarsController();
const addSpecificationToCarController = new AddSpecificationToCarController();

carRoute.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carRoute.get('/available', listCarsAvailable.handle);

carRoute.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  addSpecificationToCarController.handle,
);

export { carRoute };
