import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationRoute = Router();

specificationRoute.post('/', (request, response) =>
  createSpecificationController.handle(request, response),
);

export { specificationRoute };
