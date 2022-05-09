import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddSpecificationToCarUseCase } from './AddSpecificationToCarUseCase';

class AddSpecificationToCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specification_id } = request.body;

    const addSpecificationToCarUseCase = container.resolve(
      AddSpecificationToCarUseCase,
    );

    const cars = await addSpecificationToCarUseCase.execute({
      car_id: id,
      specification_id,
    });

    return response.json(cars);
  }
}

export { AddSpecificationToCarController };
