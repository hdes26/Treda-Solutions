import { Module, Scope } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository, IRoleRepository } from '@domain/repositories';
import { Role, User } from '@infrastructure/entities';
import { RoleRepository, UserRepository } from '@infrastructure/repositories';
import { UserController } from '@infrastructure/controllers';
import {
  ICreateAdminUserUsecase,
  ICreateCustomerUserUsecase,
} from '@domain/ports';
import {
  CreateAdminUserUsecase,
  CreateCustomerUserUsecase,
} from '@usecases/index';
import { PasswordService } from '@domain/services';

@Module({
  imports: [SequelizeModule.forFeature([Role, User])],
  controllers: [UserController],
  providers: [
    {
      provide: ICreateAdminUserUsecase,
      useClass: CreateAdminUserUsecase,
      scope: Scope.REQUEST,
    },
    {
      provide: ICreateCustomerUserUsecase,
      useClass: CreateCustomerUserUsecase,
      scope: Scope.REQUEST,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
    PasswordService,
  ],
  exports: [IUserRepository, IRoleRepository],
})
export class UserModule {}
