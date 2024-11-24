import { OrderProductModel } from '@domain/models';
import { IBaseRepository } from './base.repository';

export abstract class IOrderProductRepository extends IBaseRepository<OrderProductModel> {}
