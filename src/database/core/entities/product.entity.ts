import {
  Table,
  Column,
  PrimaryKey,
  Length,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseEntity } from './shared/base.entity';
import { Category } from './category.entity';

@Table
export class Product extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false })
  @Length({ max: 100 })
  name: string;

  @Column({ allowNull: true })
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
  @Column({ type: DataType.UUID })
  categoryId: string;

  @BelongsTo(() => Category)
  category: Category;
}
