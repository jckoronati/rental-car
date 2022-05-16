import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

interface IRequest {
  email: string;
}

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email }: IRequest = request.body;

    const sendForgotEmailPasswordUseCase = container.resolve(
      SendForgotPasswordMailUseCase,
    );

    await sendForgotEmailPasswordUseCase.execute(email);

    return response.send();
  }
}

export { SendForgotPasswordMailController };
