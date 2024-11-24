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
import { User } from './user.entity';
import { OrderProduct } from './order-product.entity';
import { OrderStatusEnum } from '@domain/enum';

@Table({ tableName: 'orders' })
export class Order extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total_price: number;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatusEnum)),
    allowNull: false,
    defaultValue: OrderStatusEnum.PENDING,
  })
  status: OrderStatusEnum;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => OrderProduct)
  order_products: OrderProduct[];
}
