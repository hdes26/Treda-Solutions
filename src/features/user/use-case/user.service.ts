import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../core/dto/create-user.dto';
import { UpdateUserDto } from '../core/dto/update-user.dto';
import { Role, User } from 'src/database/core/entities';
import { InjectModel } from '@nestjs/sequelize';
import { LoggerService } from 'src/settings/logger';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly usersRepository: typeof User,
    @InjectModel(Role)
    private readonly rolesRepository: typeof Role,
    private readonly logger: LoggerService,
  ) {}

  async create({ role, ...createUserDto }: CreateUserDto): Promise<User> {
    try {
      const roleFound = await this.rolesRepository.findOne({
        where: { name: role },
      });
      if (!roleFound) {
        throw new NotFoundException(`Role with name ${role} not found.`);
      }
      const newUser = await this.usersRepository.create({
        ...createUserDto,
        role_id: roleFound.id,
      });

      return newUser;
    } catch (error) {
      this.logger.error(UserService.name, error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.findAll();
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
    const userFound = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return await userFound.update(updateUserDto);
  }

  async remove(id: string): Promise<string> {
    const userFound = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    await userFound.update({ is_deleted: true, deleted_at: new Date() });

    return `User with id ${id} has been successfully deleted.`;
  }
}
