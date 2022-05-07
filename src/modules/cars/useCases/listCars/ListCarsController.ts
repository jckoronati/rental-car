import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCarsUseCase } from './listCarsUseCase';

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listCarsAvailable = container.resolve(ListCarsUseCase);

    const cars = await listCarsAvailable.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.json(cars);
  }
}

export { ListCarsController };