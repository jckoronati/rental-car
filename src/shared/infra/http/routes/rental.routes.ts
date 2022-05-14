import { Router } from 'express';

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { ReturnRentalController } from '../../../../modules/rentals/useCases/returnRental/ReturnRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoute = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();

rentalRoute.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoute.post(
  '/return/:id',
  ensureAuthenticated,
  returnRentalController.handle,
);

export { rentalRoute };
