import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './use-case/product.service';
import { CreateProductDto } from './core/dto/create-product.dto';
import { UpdateProductDto } from './core/dto/update-product.dto';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/utils/guards/jwt';
import { Roles, RolesGuard } from 'src/utils/guards/roles';
import { RoleNameEnum } from 'src/database/core/enum';

@UseGuards(AccessTokenGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Create product',
    description:
      'Create product. You will provide name,description,price, stock and category',
  })
  @ApiOkResponse({ description: 'Product created' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Get products',
    description: 'Get products',
  })
  @ApiOkResponse({ description: 'Get products' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: 'Get product by id',
    description: 'Get product by id',
  })
  @ApiOkResponse({ description: 'Get product by id' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update product',
    description: 'Update product by id.',
  })
  @ApiOkResponse({ description: 'Product updated' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({
    summary: 'Remove product',
    description: 'Remove product by id.',
  })
  @ApiOkResponse({ description: 'Product removed' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
