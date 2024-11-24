import { IOrderRepository } from '@domain/repositories';
import { Order } from '@infrastructure/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelStatic } from 'sequelize';
import { BaseRepository } from './base.repository';

@Injectable()
export class OrderRepository
  extends BaseRepository<Order>
  implements IOrderRepository
{
  constructor(
    @InjectModel(Order) private readonly orderRepository: ModelStatic<Order>,
  ) {
    super(orderRepository);
  }
}
