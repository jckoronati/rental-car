import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRoute = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoute.post('/', createSpecificationController.handle);

export { specificationRoute };
