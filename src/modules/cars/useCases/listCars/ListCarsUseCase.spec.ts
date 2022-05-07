import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: 'Marca teste',
      category_id: 'bf73abff-f40a-4994-9116-a4c6c43285ea',
      daily_rate: 3500,
      description: 'Descricação teste',
      fine_amount: 350,
      license_plate: 'ACB-3660',
      name: 'T-Cross TSI',
    });

    const car2 = await carsRepositoryInMemory.create({
      brand: 'Marca teste',
      category_id: 'bf73abff-f40a-4994-9116-a4c6c43285ea',
      daily_rate: 3500,
      description: 'Descricação teste',
      fine_amount: 350,
      license_plate: 'BCA-0663',
      name: 'T-Cross TSI',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car1, car2]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Marca teste para o teste de busca por nome',
      category_id: 'bf73abff-f40a-4994-9116-a4c6c43285ea',
      daily_rate: 3500,
      description: 'Descricação teste',
      fine_amount: 350,
      license_plate: 'TSN-1111',
      name: 'Teste Name',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Teste Name',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Marca teste para o teste de busca por category_id',
      category_id: 'bf73abff-f40a-4994-9116-a4c6c43285ea',
      daily_rate: 3500,
      description: 'Descricação teste',
      fine_amount: 350,
      license_plate: 'TSC-1111',
      name: 'Teste Category',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'bf73abff-f40a-4994-9116-a4c6c43285ea',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Teste',
      category_id: 'bf73abff-f40a-4994-9116-a4c6c43285ea',
      daily_rate: 3500,
      description: 'Descricação teste',
      fine_amount: 350,
      license_plate: 'TSB-1111',
      name: 'Teste Brand',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Teste',
    });

    expect(cars).toEqual([car]);
  });
});
