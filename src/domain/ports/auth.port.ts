import { LoginDto } from '@domain/dtos';

export abstract class ILoginUsecase {
  abstract handle(payload: LoginDto): Promise<any>;
}
