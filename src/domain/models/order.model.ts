import { BaseModel } from './base.model';

export class OrderModel extends BaseModel {
  id: string;
  total_price: number;
  status: any;
  user_id: string;
  order_products: any[];
}
