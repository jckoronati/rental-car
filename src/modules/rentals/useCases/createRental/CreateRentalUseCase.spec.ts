import dayjs from 'dayjs';

import { AppError } from '../../../../shared/errors/AppError';
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  const addOneDay = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to realize a car rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: addOneDay,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to rent a car if user had a rental in progress', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: addOneDay,
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: addOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to realize a rental when car is unavaible', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'u90',
        expected_return_date: addOneDay,
      });

      await createRentalUseCase.execute({
        user_id: '54321',
        car_id: 'u90',
        expected_return_date: addOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
