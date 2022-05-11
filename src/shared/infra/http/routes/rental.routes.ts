import { Router } from 'express';

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';

const rentalRoute = Router();

const createRentalController = new CreateRentalController();

rentalRoute.post('/', createRentalController.handle);

export { rentalRoute };
