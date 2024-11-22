import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../core/dto/create-product.dto';
import { UpdateProductDto } from '../core/dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category, Product } from 'src/database/core/entities';
import { LoggerService } from 'src/settings/logger';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productRepository: typeof Product,
    @InjectModel(Category)
    private readonly categoryRepository: typeof Category,
    private readonly logger: LoggerService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { name, description, price, stock, categoryId } = createProductDto;

      const productFound = await this.productRepository.findOne({
        where: { name },
      });

      if (productFound) {
        throw new ConflictException(`Product already exists.`);
      }

      const categoryFound = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });

      if (!categoryFound) {
        throw new NotFoundException(`Category not found.`);
      }

      return await this.productRepository.create({
        name,
        description,
        price,
        stock,
      });
    } catch (error) {
      this.logger.error(ProductService.name, error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.productRepository.findAll({
        include: [
          {
            model: Category,
          },
        ],
      });
    } catch (error) {
      this.logger.error(ProductService.name, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const productFound = await this.productRepository.findOne({
        where: { id },
      });
      if (!productFound) {
        throw new NotFoundException(`Product with id ${id} not found.`);
      }
      return productFound;
    } catch (error) {
      this.logger.error(ProductService.name, error);
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const productFound = await this.productRepository.findOne({
        where: { id },
      });
      if (!productFound) {
        throw new NotFoundException(`Product with id ${id} not found.`);
      }
      return await productFound.update(updateProductDto);
    } catch (error) {
      this.logger.error(ProductService.name, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const productFound = await this.productRepository.findOne({
        where: { id },
      });
      if (!productFound) {
        throw new NotFoundException(`Product with id ${id} not found.`);
      }
      await productFound.destroy();

      return `Product with id ${id} has been successfully deleted.`;
    } catch (error) {
      this.logger.error(ProductService.name, error);
      throw error;
    }
  }
}
