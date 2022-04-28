import { Router } from 'express';

import { CategoryRepository } from '../repositories/CategoryRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoute = Router();
const categoryRepository = new CategoryRepository();
const categoryService = new CreateCategoryService(categoryRepository);

categoriesRoute.post('/', (request, response) => {
  const { name, description } = request.body;

  categoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoute.get('/', (request, response) => {
  const categories = categoryRepository.list();

  return response.json(categories);
});

export { categoriesRoute };
