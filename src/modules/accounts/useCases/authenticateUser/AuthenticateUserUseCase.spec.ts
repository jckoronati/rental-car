import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

interface IRequest {
  email: string;
  password: string;
}

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('shoud be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '22222222',
      name: 'Teste Nome',
      email: 'testenemail@testeemail.com',
      password: 'senhadeteste',
    };

    await createUserUseCase.execute(user);
    const { email, password }: IRequest = user;

    const result = await authenticateUserUseCase.execute({ email, password });

    expect(result).toHaveProperty('token');
  });

  it('should not be able authenticate inexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'falseemail@false.com',
        password: 'failed',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate when password is incorret', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '22222222',
        name: 'Teste Nome',
        email: 'testenemail@testeemail.com',
        password: 'senhadeteste',
      };

      await createUserUseCase.execute(user);
      const { email }: IRequest = user;

      await authenticateUserUseCase.execute({
        email,
        password: 'errorpass',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autheticate when email is incorret', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '22222222',
        name: 'Teste Nome',
        email: 'testenemail@testeemail.com',
        password: 'senhadeteste',
      };

      await createUserUseCase.execute(user);
      const { password }: IRequest = user;

      await authenticateUserUseCase.execute({
        email: 'wrongemail@wrongmail.com',
        password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
