import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from 'src/database/core/enum';

export class FindOrdersDto {
  @ApiProperty({
    description: 'Number of page fot the pagination',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'The page number must be an integer.' })
  @Min(1, { message: 'The page number must be at least 1.' })
  page?: number = 1;

  @ApiProperty({
    description: 'Number of results per page',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'The limit must be an integer.' })
  @Min(1, { message: 'The limit must be at least 1.' })
  limit?: number = 10;

  @ApiProperty({
    description: 'Status of the order',
    enum: OrderStatusEnum,
  })
  @IsEnum(OrderStatusEnum, {
    message: `The status must be one of the following: ${Object.values(
      OrderStatusEnum,
    ).join(', ')}`,
  })
  @IsNotEmpty({
    message: 'The status field cannot be empty.',
  })
  status: OrderStatusEnum;
}
