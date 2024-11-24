import { IUserRepository } from '@domain/repositories';
import { User } from '@infrastructure/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelStatic } from 'sequelize';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectModel(User) private readonly userRepository: ModelStatic<User>,
  ) {
    super(userRepository);
  }
}
