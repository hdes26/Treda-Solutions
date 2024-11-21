import { Module } from '@nestjs/common';
import { AuthService } from './use-case/auth.service';
import { AuthController } from './auth.controller';
import { LoggerModule } from 'src/settings/logger';
import { User } from 'src/database/core/entities';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
