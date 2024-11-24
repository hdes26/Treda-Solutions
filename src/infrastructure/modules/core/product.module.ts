import { Category, Product } from '@infrastructure/entities';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Product, Category])],
  controllers: [],
  providers: [],
})
export class ProductModule {}
