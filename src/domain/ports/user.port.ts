import { CreateUserDTO, UpdateUserDTO } from '@domain/dtos';

export abstract class ICreateAdminUserUsecase {
  abstract handle(payload: CreateUserDTO): Promise<any>;
}

export abstract class ICreateCustomerUserUsecase {
  abstract handle(payload: CreateUserDTO): Promise<any>;
}

export abstract class IUpdateUserUsecase {
  abstract handle(payload: UpdateUserDTO): Promise<any>;
}
