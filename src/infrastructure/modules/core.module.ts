import { Module } from '@nestjs/common';
import {
  AuthModule,
  CategoryModule,
  OrderModule,
  ProductModule,
  UserModule,
} from '@infrastructure/modules';

@Module({
  imports: [AuthModule, CategoryModule, OrderModule, ProductModule, UserModule],
})
export class CoreModule {}
