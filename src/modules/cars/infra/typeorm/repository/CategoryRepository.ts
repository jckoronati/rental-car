import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../../data-source';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../../../repositories/ICategoryRepository';
import { Category } from '../entities/Category';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name });

    return category;
  }
}

export { CategoryRepository };
