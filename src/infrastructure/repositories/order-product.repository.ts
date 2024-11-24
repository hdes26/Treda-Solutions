import { IOrderProductRepository } from '@domain/repositories';
import { OrderProduct } from '@infrastructure/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelStatic } from 'sequelize';
import { BaseRepository } from './base.repository';

@Injectable()
export class OrderProductRepository
  extends BaseRepository<OrderProduct>
  implements IOrderProductRepository
{
  constructor(
    @InjectModel(OrderProduct)
    private readonly userRepository: ModelStatic<OrderProduct>,
  ) {
    super(userRepository);
  }
}
