import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { AddSpecificationToCarUseCase } from './AddSpecificationToCarUseCase';

let addSpecificationToCar: AddSpecificationToCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Add Specification to Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    addSpecificationToCar = new AddSpecificationToCarUseCase(
      carsRepositoryInMemory,
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

    await addSpecificationToCar.execute({
      car_id: car.id,
      specification_id: ['3200', '3201'],
    });
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
