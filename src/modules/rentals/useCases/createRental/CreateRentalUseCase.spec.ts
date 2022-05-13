import dayjs from 'dayjs';

import { DayJSDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayJSDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DayJSDateProvider;

describe('Create Rental', () => {
  const addOneDay = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dateProvider = new DayJSDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carRepositoryInMemory,
    );
  });

  it('should be able to realize a car rental', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: addOneDay,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to rent a car when user already has a rental in progress', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1111',
      expected_return_date: addOneDay,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: addOneDay,
      }),
    ).rejects.toEqual(new AppError('User has a rental on progress'));
  });

  it('should not be able to rent a car when car is unavailable', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      expected_return_date: addOneDay,
      user_id: '321',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '123',
        expected_return_date: addOneDay,
        car_id: 'test',
      }),
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not be able to rent a car if time of use not is the minimum expected time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(
      new AppError('The rental needs to have 24 hours minimum!'),
    );
  });
});
