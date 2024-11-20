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
import { Role } from './role.entity';
import { Order } from './order.entity';

@Table({ tableName: 'users' })
export class User extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  email: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID, allowNull: false })
  role_id: string;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Order)
  orders: Order[];
}
