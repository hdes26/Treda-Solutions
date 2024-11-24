import { BaseModel } from './base.model';
import { OrderModel } from './order.model';

export class UserModel extends BaseModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: any;
  orders: OrderModel[];
}
