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
export class Role extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column
  @Length({ max: 50 })
  name: string;

  @Column
  @Length({ max: 100 })
  email: string;

  @HasMany(() => User)
  users: User[];
}
