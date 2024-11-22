import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../core/dto/create-user.dto';
import { UpdateUserDto } from '../core/dto/update-user.dto';
import { Role, User } from 'src/database/core/entities';
import { InjectModel } from '@nestjs/sequelize';
import { LoggerService } from 'src/settings/logger';
import { RoleNameEnum } from 'src/database/core/enum';
import { encryptPassword } from 'src/utils/functions';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly usersRepository: typeof User,
    @InjectModel(Role)
    private readonly rolesRepository: typeof Role,
    private readonly logger: LoggerService,
  ) {}

  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name, email, password } = createUserDto;

      const roleFound = await this.rolesRepository.findOne({
        where: { name: RoleNameEnum.ADMIN },
      });
      if (!roleFound) {
        throw new NotFoundException(`Role admin not found.`);
      }
      const newUser = await this.usersRepository.create({
        name,
        email,
        role_id: roleFound.id,
        password: encryptPassword(password),
      });

      return newUser;
    } catch (error) {
      this.logger.error(UserService.name, error);
      throw error;
    }
  }

  async createCustomer(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name, email, password } = createUserDto;

      const roleFound = await this.rolesRepository.findOne({
        where: { name: RoleNameEnum.CUSTOMER },
      });
      if (!roleFound) {
        throw new NotFoundException(`Role admin not found.`);
      }
      const newUser = await this.usersRepository.create({
        name,
        email,
        role_id: roleFound.id,
        password: encryptPassword(password),
      });

      return newUser;
    } catch (error) {
      this.logger.error(UserService.name, error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.findAll({
        include: [
          {
            model: Role,
            where: { name: RoleNameEnum.CUSTOMER },
            required: true,
          },
        ],
      });
    } catch (error) {
      this.logger.error(UserService.name, error);
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const userFound = await this.usersRepository.findOne({
        where: { id },
      });
      if (!userFound) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      return userFound;
    } catch (error) {
      this.logger.error(UserService.name, error);
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userFound = await this.usersRepository.findOne({
        where: { id },
      });
      if (!userFound) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      return await userFound.update(updateUserDto);
    } catch (error) {
      this.logger.error(UserService.name, error);
      throw error;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const userFound = await this.usersRepository.findOne({
        where: { id },
      });
      if (!userFound) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      await userFound.destroy();

      return `User with id ${id} has been successfully deleted.`;
    } catch (error) {
      this.logger.error(UserService.name, error);
      throw error;
    }
  }
}
