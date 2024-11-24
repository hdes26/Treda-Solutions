import { BaseModel } from './base.model';
import { UserModel } from './user.model';

export class RoleModel extends BaseModel {
  id: string;
  name: string;
  description: string;
  users: UserModel[];
}
