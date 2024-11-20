import {
  Table,
  Column,
  PrimaryKey,
  DataType,
  Length,
  HasMany,
} from 'sequelize-typescript';
import { BaseEntity } from './shared/base.entity';
import { Product } from './product.entity';

@Table({ tableName: 'categories' })
export class Category extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Length({ max: 50 })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Length({ max: 100 })
  description: string;

  @HasMany(() => Product)
  products: Product[];
}
