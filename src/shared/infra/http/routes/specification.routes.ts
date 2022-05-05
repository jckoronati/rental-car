import { Router } from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationRoute = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoute.use(ensureAuthenticated);
specificationRoute.post('/', createSpecificationController.handle);

export { specificationRoute };
