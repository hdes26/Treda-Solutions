import { ICategoryRepository } from '@domain/repositories';
import { Category } from '@infrastructure/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelStatic } from 'sequelize';
import { BaseRepository } from './base.repository';

@Injectable()
export class CategoryRepository
  extends BaseRepository<Category>
  implements ICategoryRepository
{
  constructor(
    @InjectModel(Category)
    private readonly categoryRepository: ModelStatic<Category>,
  ) {
    super(categoryRepository);
  }
}
