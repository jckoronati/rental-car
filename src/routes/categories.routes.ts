import { Router } from 'express';

import { CategoryRepository } from '../modules/cars/repositories/CategoryRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRoute = Router();
const categoryRepository = new CategoryRepository();

categoriesRoute.post('/', (request, response) => {
  const { name, description } = request.body;
  const categoryService = new CreateCategoryService(categoryRepository);

  categoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoute.get('/', (request, response) => {
  const categories = categoryRepository.list();

  return response.json(categories);
});

export { categoriesRoute };
