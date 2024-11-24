import { CreateUserDTO } from '@domain/dtos';
import {
  ICreateAdminUserUsecase,
  ICreateCustomerUserUsecase,
} from '@domain/ports';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/* @ApiBearerAuth() */
@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(
    private readonly createAdminUserUseCase: ICreateAdminUserUsecase,
    private readonly createCustomerUserUsecase: ICreateCustomerUserUsecase,
  ) {}

  @Post('admin')
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(@Body() body: CreateUserDTO): Promise<any> {
    return await this.createAdminUserUseCase.handle(body);
  }

  @Post('customer')
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(@Body() body: CreateUserDTO): Promise<any> {
    return await this.createCustomerUserUsecase.handle(body);
  }
}
