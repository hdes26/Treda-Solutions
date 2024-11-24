import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/infrastructure/config/logger';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order, OrderProduct, Product, User } from '@infrastructure/entities';

@Module({
  imports: [
    LoggerModule,
    SequelizeModule.forFeature([Order, User, Product, OrderProduct]),
  ],
  controllers: [],
  providers: [],
})
export class OrderModule {}
