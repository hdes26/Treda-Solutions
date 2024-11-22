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
import { UpdateOrderStatusDto } from './core/dto/update-order-status.dto';
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
import { FindOrdersDto } from './core/dto/find-order.dto';

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
  async findAll(@Query() findOrdersDto: FindOrdersDto) {
    return await this.orderService.findAll(findOrdersDto);
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
    summary: 'Update order status',
    description:
      'Update order status by id. The admin will provide the new status',
  })
  @ApiOkResponse({ description: 'Order updated' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Patch('status/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return await this.orderService.update(id, updateOrderStatusDto);
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
