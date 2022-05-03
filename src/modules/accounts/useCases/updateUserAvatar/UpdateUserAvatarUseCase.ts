import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);

    user.avatar = avatarFile;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
