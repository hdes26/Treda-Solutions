import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './use-case/user.service';
import { CreateUserDto } from './core/dto/create-user.dto';
import { UpdateUserDto } from './core/dto/update-user.dto';
import {
  ApiBadGatewayResponse,
  ApiBasicAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BasicGuard } from 'src/utils/guards/basic';

@ApiTags('user')
@Controller('user')
@ApiBasicAuth()
@UseGuards(BasicGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create admin user',
    description: 'Create admin user. You will provide the name and email',
  })
  @ApiOkResponse({ description: 'Admin user created' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Post('admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createAdmin(createUserDto);
  }

  @ApiOperation({
    summary: 'Create customer user',
    description: 'Create customer user. You will provide the name and email',
  })
  @ApiOkResponse({ description: 'Customer user created' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Post('customer')
  async createCustomer(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createCustomer(createUserDto);
  }

  @ApiOperation({
    summary: 'Get customer users',
    description: 'Get customer users',
  })
  @ApiOkResponse({ description: 'Get customer users' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Get customer user by id',
    description: 'Get customer user by id',
  })
  @ApiOkResponse({ description: 'Get customer user by id' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Update user by id.',
  })
  @ApiOkResponse({ description: 'User updated' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Remove user',
    description: 'Remove user by id.',
  })
  @ApiOkResponse({ description: 'User removed' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
