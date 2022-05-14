import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

class DayJSDateProvider implements IDateProvider {
  constructor() {
    dayjs.extend(utc);
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const endDateUTC = this.convertToUTC(end_date);
    const startDateUTD = this.convertToUTC(start_date);

    return dayjs(endDateUTC).diff(startDateUTD, 'days');
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const endDateUTC = this.convertToUTC(end_date);
    const startDateUTC = this.convertToUTC(start_date);

    return dayjs(endDateUTC).diff(startDateUTC, 'hours');
  }
}

export { DayJSDateProvider };
