import { ProductModel } from '@domain/models';
import { IBaseRepository } from './base.repository';

export abstract class IProductRepository extends IBaseRepository<ProductModel> {}
