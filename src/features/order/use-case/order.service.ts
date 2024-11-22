import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../core/dto/create-order.dto';
import { UpdateOrderDto } from '../core/dto/update-order.dto';

@Injectable()
export class OrderService {
  async create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() {
    return `This action returns all order`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
