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
import { CategoryService } from './use-case/category.service';
import { CreateCategoryDto } from './core/dto/create-category.dto';
import { UpdateCategoryDto } from './core/dto/update-category.dto';
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
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Create category',
    description: 'Create category. You will provide the name and description',
  })
  @ApiOkResponse({ description: 'Category created' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({
    summary: 'Get categories users',
    description: 'Get categories users',
  })
  @ApiOkResponse({ description: 'Get categories' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @ApiOperation({
    summary: 'Get category by id',
    description: 'Get category by id',
  })
  @ApiOkResponse({ description: 'Get category by id' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update category',
    description: 'Update category by id.',
  })
  @ApiOkResponse({ description: 'Category updated' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Remove category',
    description: 'Remove category by id.',
  })
  @ApiOkResponse({ description: 'Category removed' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Roles(RoleNameEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
