import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

class Car {
  id?: string = uuid();

  name: string;

  description: string;

  daily_rate: number;

  available?: boolean = true;

  license_plate: string;

  fine_amount: number;

  brand: string;

  category_id: string;

  created_at: Date = new Date();
}

export { Car };
