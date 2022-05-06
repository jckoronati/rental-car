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
      available: true,
      id: '11111111',
    });
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
        available: true,
        id: '11111111',
      });

      await createCarUseCase.execute({
        brand: 'Outro teste de marca',
        category_id: '',
        daily_rate: 128,
        description: 'Outro teste de descrições',
        fine_amount: 110,
        license_plate: 'TST-30803',
        name: 'Outro carro teste',
        available: true,
        id: '22222222',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
