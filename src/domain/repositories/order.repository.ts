import { OrderModel } from '@domain/models';
import { IBaseRepository } from './base.repository';

export abstract class IOrderRepository extends IBaseRepository<OrderModel> {}
