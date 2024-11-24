import { CategoryModel } from '@domain/models';
import { IBaseRepository } from './base.repository';

export abstract class ICategoryRepository extends IBaseRepository<CategoryModel> {}
