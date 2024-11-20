import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
} from 'sequelize-typescript';

@Table
export class BaseEntity extends Model {
  @CreatedAt
  @Column({ type: 'TIMESTAMP' })
  created_at: Date;

  @UpdatedAt
  @Column({ type: 'TIMESTAMP' })
  updated_at: Date;

  @DeletedAt
  @Column({ type: 'TIMESTAMP' })
  deleted_at: Date;

  @Default(false)
  @Column({ type: 'BOOLEAN' })
  is_deleted: boolean;
}
