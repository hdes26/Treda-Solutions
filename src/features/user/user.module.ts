import { Module } from '@nestjs/common';
import { UserService } from './use-case/user.service';
import { UserController } from './user.controller';
import { LoggerModule } from 'src/settings/logger';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role, User } from 'src/database/core/entities';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
