import { Router } from 'express';

import { CategoriRepository } from '../repositories/CategoryRepository';

const categoriesRoute = Router();
const categoriesRepository = new CategoriRepository();

categoriesRoute.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = {
    name,
    description,
  };

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists)
    return response.status(400).json({ error: 'Category Alterady Exists' });

  categoriesRepository.create(category);

  return response.status(201).send();
});

categoriesRoute.get('/', (request, response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

export { categoriesRoute };
