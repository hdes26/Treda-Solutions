import { Module } from '@nestjs/common';
import { ProductService } from './use-case/product.service';
import { ProductController } from './product.controller';
import { LoggerModule } from 'src/settings/logger';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category, Product } from 'src/database/core/entities';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
