import { Module, Scope } from '@nestjs/common';
import { ILoginUsecase } from '@domain/ports';
import { IUserRepository } from '@domain/repositories';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRepository } from '@infrastructure/repositories';
import { User } from '@infrastructure/entities';
import { AuthController } from '@infrastructure/controllers';
import { LoginUsecase } from '@usecases/index';
import { LoggerModule } from '@infrastructure/config/logger';
import { PasswordService } from '@domain/services';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: ILoginUsecase,
      useClass: LoginUsecase,
      scope: Scope.REQUEST,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    PasswordService,
  ],
})
export class AuthModule {}
