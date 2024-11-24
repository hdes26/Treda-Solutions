import { BaseModel } from './base.model';

export class ProductModel extends BaseModel {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  order_products: any[];
}
