import { Category } from '@infrastructure/entities';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [],
  providers: [],
})
export class CategoryModule {}
