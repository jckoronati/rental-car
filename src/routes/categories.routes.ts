import { Router } from 'express';

import { Category } from '../model/Category';

const categoriesRoute = Router();

const categories: Category[] = [];

categoriesRoute.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = new Category();

  Object.assign(category, {
    name,
    description,
  });

  categories.push(category);

  return response.status(201).json({ category });
});

export { categoriesRoute };
