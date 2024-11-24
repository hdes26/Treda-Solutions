import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository, IRoleRepository } from '@domain/repositories';
import { Role, User } from '@infrastructure/entities';
import { RoleRepository, UserRepository } from '@infrastructure/repositories';

@Module({
  imports: [SequelizeModule.forFeature([Role, User])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
  ],
  exports: [IUserRepository, IRoleRepository],
})
export class UserModule {}
