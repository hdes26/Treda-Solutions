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

@Table({ tableName: 'roles' })
export class Role extends BaseEntity {
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

  @HasMany(() => User)
  users: User[];
}
