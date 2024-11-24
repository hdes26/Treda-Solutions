import { CreateUserDTO, UpdateUserDTO } from '@domain/dtos';

export abstract class ICreateUserUsecase {
  abstract handle(payload: CreateUserDTO): Promise<any>;
}

export abstract class IUpdateUserUsecase {
  abstract handle(payload: UpdateUserDTO): Promise<any>;
}
