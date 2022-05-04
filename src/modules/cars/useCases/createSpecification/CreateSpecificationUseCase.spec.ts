import { AppError } from '../../../../errors/AppError';
import { SpecificationRepositoryInMemory } from '../../repositories/in-memory/SpecificationRepositoryInMemory';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let specificationUseCase: CreateSpecificationUseCase;

interface IRequest {
  name: string;
  description: string;
}

describe('Create a specification', () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    specificationUseCase = new CreateSpecificationUseCase(
      specificationRepositoryInMemory,
    );
  });

  it('should be able to create a new specification', async () => {
    const specification: IRequest = {
      name: 'Direção hidraulica',
      description: 'Carros com direção hidraulica',
    };

    const { name, description } = specification;

    await specificationUseCase.execute({
      name,
      description,
    });

    const specificationCreated =
      await specificationRepositoryInMemory.findByName(name);

    expect(specificationCreated).toHaveProperty('id');
  });

  it('should not be able to create a specification when specification name already in use', async () => {
    expect(async () => {
      const specification: IRequest = {
        name: 'Direção hidraulica',
        description: 'Carros com direção hidraulica',
      };

      const { name, description } = specification;

      await specificationUseCase.execute({
        name,
        description,
      });

      await specificationUseCase.execute({
        name,
        description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
