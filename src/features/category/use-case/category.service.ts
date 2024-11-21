import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from '../core/dto/create-category.dto';
import { UpdateCategoryDto } from '../core/dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/database/core/entities';
import { LoggerService } from 'src/settings/logger';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryRepository: typeof Category,
    private readonly logger: LoggerService,
  ) {}
  async create({ name, description }: CreateCategoryDto): Promise<Category> {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: { name },
      });

      if (categoryFound) {
        throw new ConflictException(`Category already exists.`);
      }

      return await this.categoryRepository.create({
        name,
        description,
      });
    } catch (error) {
      this.logger.error(CategoryService.name, error);
      throw error;
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      this.logger.error(CategoryService.name, error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Category> {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!categoryFound) {
        throw new NotFoundException(`Category with id ${id} not found.`);
      }
      return categoryFound;
    } catch (error) {
      this.logger.error(CategoryService.name, error);
      throw error;
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!categoryFound) {
        throw new NotFoundException(`Category with id ${id} not found.`);
      }
      return await categoryFound.update(updateCategoryDto);
    } catch (error) {
      this.logger.error(CategoryService.name, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!categoryFound) {
        throw new NotFoundException(`Category with id ${id} not found.`);
      }
      await categoryFound.destroy();

      return `Category with id ${id} has been successfully deleted.`;
    } catch (error) {
      this.logger.error(CategoryService.name, error);
      throw error;
    }
  }
}
