import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a car', async () => {
    await createCarUseCase.execute({
      brand: 'Teste marca',
      category_id: '',
      daily_rate: 128,
      description: 'Teste de descrições',
      fine_amount: 1550,
      license_plate: 'TST-30803',
      name: 'Carro teste',
    });
  });

  it('should be create a car which are available by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Teste marca 2',
      category_id: '',
      daily_rate: 550,
      description: 'Teste de descrição 2',
      fine_amount: 1250,
      license_plate: 'TST-30803',
      name: 'Carro teste disponibilidade',
    });

    expect(car.available).toBe(true);
  });

  it('should not be able to create a car when license plate already in use', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: 'Teste marca',
        category_id: '',
        daily_rate: 128,
        description: 'Teste de descrições',
        fine_amount: 1550,
        license_plate: 'TST-30803',
        name: 'Carro teste',
      });

      await createCarUseCase.execute({
        brand: 'Outro teste de marca',
        category_id: '',
        daily_rate: 128,
        description: 'Outro teste de descrições',
        fine_amount: 110,
        license_plate: 'TST-30803',
        name: 'Outro carro teste',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
