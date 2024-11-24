import { Model, FindOptions, ModelStatic, QueryTypes } from 'sequelize';
import { IBaseRepository } from '@domain/repositories';
import { IPagination } from '@domain/interfaces';

export abstract class BaseRepository<T extends Model<T>>
  implements IBaseRepository<T>
{
  readonly entity: ModelStatic<T>;

  protected constructor(entity: ModelStatic<T>) {
    this.entity = entity;
  }

  public async create(): Promise<T> {
    return this.entity.build() as T;
  }

  public async save(doc: T): Promise<T> {
    return doc.save();
  }

  public async findOne(options: FindOptions): Promise<T | null> {
    return this.entity.findOne(options);
  }

  public async find(options: FindOptions): Promise<T[]> {
    return this.entity.findAll(options);
  }

  public async delete(doc: T): Promise<T> {
    await doc.destroy();
    return doc;
  }

  public async paginate(
    options: { page: number; limit: number },
    query: Record<string, any> = {},
  ): Promise<IPagination<T>> {
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.entity.findAndCountAll({
      where: query,
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      items: rows,
      meta: {
        totalItems: count,
        itemCount: rows.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  public async rawQuery(
    expression: string,
    parameters?: any[],
  ): Promise<any[]> {
    return this.entity.sequelize.query(expression, {
      replacements: parameters,
      type: QueryTypes.SELECT,
    });
  }
}
