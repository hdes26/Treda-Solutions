import {
  Table,
  Column,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { BaseEntity } from './shared/base.entity';
import { User } from './user.entity';
import { RoleNameEnum } from '@domain/enum';

@Table({ tableName: 'roles' })
export class Role extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    type: DataType.ENUM(...Object.values(RoleNameEnum)),
    allowNull: false,
    unique: true,
  })
  name: RoleNameEnum;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  description: string;

  @HasMany(() => User)
  users: User[];
}
