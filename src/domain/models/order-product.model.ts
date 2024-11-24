import { BaseModel } from './base.model';

export class OrderProductModel extends BaseModel {
  id: string;
  quantity: number;
  total_price: number;
  order_id: string;
  product_id: string;
}
