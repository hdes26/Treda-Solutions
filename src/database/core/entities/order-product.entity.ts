import {
  Table,
  Column,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseEntity } from './shared/base.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Table
export class OrderProduct extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total_price: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  order_id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  product_id: string;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  product: Product;
}
