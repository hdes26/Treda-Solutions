import { CreateUserDTO } from '@domain/dtos';
import { RoleNameEnum } from '@domain/enum';
import { ICreateCustomerUserUsecase } from '@domain/ports';
import { IRoleRepository, IUserRepository } from '@domain/repositories';
import { PasswordService } from '@domain/services';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CreateCustomerUserUsecase implements ICreateCustomerUserUsecase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async handle(payload: CreateUserDTO): Promise<string> {
    const exists = await this.repository.findOne({
      where: { email: payload.email },
    });
    if (exists) throw new ConflictException('User already registered.');

    const roleFound = await this.roleRepository.findOne({
      where: { name: RoleNameEnum.CUSTOMER },
    });
    if (!roleFound) {
      throw new NotFoundException(`Role admin not found.`);
    }
    const user = await this.repository.create();

    Object.assign(user, payload);

    user.password = this.passwordService.encryptPassword(payload.password);

    user.role = roleFound.id;

    await this.repository.save(user);

    return 'user created';
  }
}
