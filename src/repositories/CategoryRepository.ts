import { Category } from '../model/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }
}

export { CategoriRepository };
