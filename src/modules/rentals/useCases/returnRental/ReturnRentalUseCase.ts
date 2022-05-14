import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { LateFee } from '../../../../utils/helpers/LateFee';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rentals } from '../../infra/typeorm/entities/Rentals';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarRepository')
    private carRepository: ICarsRepository,
    @inject('DateProvider')
    private dayJSDateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rentals> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carRepository.findById(rental.car_id);

    if (!rental) throw new AppError('This rental does not exist');

    const minimumDaysFoRental = 1;
    const dateNow = this.dayJSDateProvider.dateNow();

    let daily = this.dayJSDateProvider.compareInDays(
      rental.start_date,
      dateNow,
    );

    if (daily <= 0) daily = minimumDaysFoRental;

    const delay = this.dayJSDateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let amount = 0;

    if (delay < 0)
      amount = LateFee.calculateLateFeeBill(delay, car.fine_amount);

    amount += daily * car.daily_rate;

    rental.end_date = this.dayJSDateProvider.dateNow();
    rental.amount = amount;

    await this.rentalsRepository.create(rental);
    await this.carRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { ReturnRentalUseCase };
