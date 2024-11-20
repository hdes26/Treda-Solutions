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
import { Role } from './role.entity';

@Table
export class User extends BaseEntity {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column
  @Length({ max: 100 })
  name: string;

  @Column
  @Length({ max: 100 })
  email: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID })
  roleId: string;

  @BelongsTo(() => Role)
  role: Role;
}
