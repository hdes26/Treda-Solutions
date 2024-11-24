import { UserModel } from '@domain/models';
import { IBaseRepository } from './base.repository';

export abstract class IUserRepository extends IBaseRepository<UserModel> {}
