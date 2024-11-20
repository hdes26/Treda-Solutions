import {
  Table,
  Column,
  PrimaryKey,
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
    type: DataType.STRING(50),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  description: string;

  @HasMany(() => User)
  users: User[];
}
