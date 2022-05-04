import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository';

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      specification => specification.name === name,
    );

    return specification;
  }
}

export { SpecificationRepositoryInMemory };
