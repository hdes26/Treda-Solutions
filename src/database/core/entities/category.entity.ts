import {
  Table,
  Column,
  PrimaryKey,
  Length,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { BaseEntity } from './shared/base.entity';
import { User } from './user.entity';

@Table
export class Category extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false })
  @Length({ max: 50 })
  name: string;

  @Column({ allowNull: true })
  @Length({ max: 100 })
  description: string;

  @HasMany(() => User)
  users: User[];
}
