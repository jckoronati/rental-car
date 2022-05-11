interface IDateProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
}

export { IDateProvider };
