import {
  Table,
  Column,
  PrimaryKey,
  DataType,
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
    type: DataType.STRING(50),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
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
