import { IRoleRepository } from '@domain/repositories';
import { Role } from '@infrastructure/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelStatic } from 'sequelize';
import { BaseRepository } from './base.repository';

@Injectable()
export class RoleRepository
  extends BaseRepository<Role>
  implements IRoleRepository
{
  constructor(
    @InjectModel(Role) private readonly roleRepository: ModelStatic<Role>,
  ) {
    super(roleRepository);
  }
}
