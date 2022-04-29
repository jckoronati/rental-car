import { Router } from 'express';

import { SpecificationRepository } from '../modules/cars/repositories/SpecificationRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationRoute = Router();
const specificationRepository = new SpecificationRepository();

specificationRoute.post('/', (request, response) => {
  const { name, description } = request.body;
  const specificationService = new CreateSpecificationService(
    specificationRepository,
  );

  specificationService.execute({ name, description });

  return response.status(201).send();
});

export { specificationRoute };
