import { Router } from 'express';

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalsByUserController } from '../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { ReturnRentalController } from '../../../../modules/rentals/useCases/returnRental/ReturnRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoute = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalByUserController = new ListRentalsByUserController();

rentalRoute.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoute.post(
  '/return/:id',
  ensureAuthenticated,
  returnRentalController.handle,
);

rentalRoute.get(
  '/user',
  ensureAuthenticated,
  listRentalByUserController.handle,
);

export { rentalRoute };
