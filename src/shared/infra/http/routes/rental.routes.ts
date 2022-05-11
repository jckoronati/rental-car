import { Router } from 'express';

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoute = Router();

const createRentalController = new CreateRentalController();

rentalRoute.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalRoute };
