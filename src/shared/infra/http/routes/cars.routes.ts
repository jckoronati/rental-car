import { Router } from 'express';

import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';

const carRoute = Router();

const createCarController = new CreateCarController();

carRoute.post('/', createCarController.handle);

export { carRoute };
