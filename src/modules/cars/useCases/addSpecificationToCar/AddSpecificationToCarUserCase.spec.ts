import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '../../repositories/in-memory/SpecificationRepositoryInMemory';
import { AddSpecificationToCarUseCase } from './AddSpecificationToCarUseCase';

let addSpecificationToCar: AddSpecificationToCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Add Specification to Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();

    addSpecificationToCar = new AddSpecificationToCarUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a specification for a car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Teste marca',
      category_id: '',
      daily_rate: 128,
      description: 'Teste de descrições',
      fine_amount: 1550,
      license_plate: 'TST-30803',
      name: 'Carro teste',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });

    const specification_id = [specification.id];

    const specificationsToCar = await addSpecificationToCar.execute({
      car_id: car.id,
      specification_id,
    });

    expect(specificationsToCar).toHaveProperty('specifications');
    expect(specificationsToCar.specifications.length).toBe(1);
  });

  it('should not be able to add a specification when car does not exists', async () => {
    expect(async () => {
      await addSpecificationToCar.execute({
        car_id: '12345',
        specification_id: ['5435', '5563'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
