import { RoleModel } from '@domain/models';
import { IBaseRepository } from './base.repository';

export abstract class IRoleRepository extends IBaseRepository<RoleModel> {}
