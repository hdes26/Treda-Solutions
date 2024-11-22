import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrderService } from './use-case/order.service';
import { CreateOrderDto } from './core/dto/create-order.dto';
import { UpdateOrderDto } from './core/dto/update-order.dto';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/utils/guards/jwt';
import { Roles, RolesGuard } from 'src/utils/guards/roles';
import { RoleNameEnum } from 'src/database/core/enum';

@UseGuards(AccessTokenGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: 'Create orders',
    description: 'Create order. You will provide the products to buy',
  })
  @ApiOkResponse({ description: 'Order created' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.CUSTOMER)
  @Post(':userId')
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Query('userId') userId: string,
  ) {
    return await this.orderService.create(userId, createOrderDto);
  }

  @ApiOperation({
    summary: 'Get all the orders',
    description: 'Get orders',
  })
  @ApiOkResponse({ description: 'Get orders' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @ApiOperation({
    summary: 'Get all the orders by userId',
    description: 'Get orders',
  })
  @ApiOkResponse({ description: 'Get orders by userId' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.CUSTOMER)
  @Get('user/:userId')
  async findAllUsersOrders(@Query('userId') userId: string) {
    return await this.orderService.findAllUsersOrders(userId);
  }

  @ApiOperation({
    summary: 'Get order by id',
    description: 'Get order by id',
  })
  @ApiOkResponse({ description: 'Get order by id' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.CUSTOMER, RoleNameEnum.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update order',
    description: 'Update order by id.',
  })
  @ApiOkResponse({ description: 'Order updated' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.CUSTOMER, RoleNameEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @ApiOperation({
    summary: 'Remove order',
    description: 'Remove order by id.',
  })
  @ApiOkResponse({ description: 'Order removed' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
