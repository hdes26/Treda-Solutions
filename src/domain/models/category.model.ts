import { BaseModel } from './base.model';
import { ProductModel } from './product.model';

export class CategoryModel extends BaseModel {
  id: string;
  name: string;
  description: string;
  products: ProductModel[];
}
