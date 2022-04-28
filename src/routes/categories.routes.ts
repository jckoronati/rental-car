import { Router } from 'express';

import { Category } from '../model/Category';
import { CategoriRepository } from '../repositories/CategoryRepository';

const categoriesRoute = Router();
const categoriesRepository = new CategoriRepository();

categoriesRoute.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = {
    name,
    description,
  };

  categoriesRepository.create(category);

  return response.status(201).send();
});

export { categoriesRoute };
