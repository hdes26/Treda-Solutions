import {
  Table,
  Column,
  PrimaryKey,
  DataType,
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
    type: DataType.STRING(50),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  description: string;

  @HasMany(() => Product)
  products: Product[];
}
