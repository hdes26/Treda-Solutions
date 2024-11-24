import { IProductRepository } from '@domain/repositories';
import { Product } from '@infrastructure/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelStatic } from 'sequelize';
import { BaseRepository } from './base.repository';

@Injectable()
export class ProductRepository
  extends BaseRepository<Product>
  implements IProductRepository
{
  constructor(
    @InjectModel(Product)
    private readonly productRepository: ModelStatic<Product>,
  ) {
    super(productRepository);
  }
}
