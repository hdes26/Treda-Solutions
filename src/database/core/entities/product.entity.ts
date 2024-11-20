import {
  Table,
  Column,
  PrimaryKey,
  DataType,
  Length,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { BaseEntity } from './shared/base.entity';
import { Category } from './category.entity';
import { OrderProduct } from './order-product.entity';

@Table({ tableName: 'products' })
export class Product extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Length({ max: 100 })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Length({ max: 100 })
  description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID, allowNull: false })
  category_id: string;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => OrderProduct)
  order_products: OrderProduct[];
}
