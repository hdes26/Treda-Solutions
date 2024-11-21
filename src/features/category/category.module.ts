import { Module } from '@nestjs/common';
import { CategoryService } from './use-case/category.service';
import { CategoryController } from './category.controller';
import { LoggerModule } from 'src/settings/logger';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/database/core/entities';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
