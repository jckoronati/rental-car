import { AppError } from '../../../../shared/errors/AppError';
import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategory: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

interface IRequest {
  name: string;
  description: string;
}

describe('Create a category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoryRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    const category: IRequest = {
      name: 'Sedan',
      description: 'Carro mais espaçoso com maior conforto',
    };

    const { name, description } = category;

    await createCategory.execute({
      name,
      description,
    });

    const categoryCreated = await categoryRepositoryInMemory.findByName(name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category when name already in use', async () => {
    expect(async () => {
      const category: IRequest = {
        name: 'Test name',
        description: 'Test description',
      };

      const { name, description } = category;

      await createCategory.execute({
        name,
        description,
      });

      await createCategory.execute({
        name,
        description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
