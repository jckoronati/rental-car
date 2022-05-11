import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';

import { AppError } from '../../../../shared/errors/AppError';
import { Rentals } from '../../infra/typeorm/entities/Rentals';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  private minimumTime = 24;

  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rentals> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) throw new AppError('Car is unavailable');

    const rentalIsOpenToUser =
      await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalIsOpenToUser) throw new AppError('User has a rental on progress');

    dayjs.extend(dayjsUtc);
    const compare = dayjs(expected_return_date).diff(
      dayjs.utc().local().format(),
      'hours',
    );

    if (compare < this.minimumTime)
      throw new AppError('The rental needs to have 24 hours minimum');

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
