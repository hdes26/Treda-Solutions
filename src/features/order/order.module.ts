import { Module } from '@nestjs/common';
import { OrderService } from './use-case/order.service';
import { OrderController } from './order.controller';
import { LoggerModule } from 'src/settings/logger';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order, OrderProduct, Product, User } from 'src/database/core/entities';

@Module({
  imports: [
    LoggerModule,
    SequelizeModule.forFeature([Order, User, Product, OrderProduct]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
