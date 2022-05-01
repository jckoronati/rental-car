import { CategoryRepository } from '../../repositories/implementations/CategoryRepository';
import { ListCategoryController } from './ListCategoryController';
import { ListCategoryUseCase } from './ListCategoryUseCase';

const categoryRepository = null;

const listCategoryUseCase = new ListCategoryUseCase(categoryRepository);

const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController };
