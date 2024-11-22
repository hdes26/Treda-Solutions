import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsUUID,
  Min,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductQuantityDto {
  @ApiProperty({
    description: 'UUID of the product',
    type: String,
  })
  @IsUUID('4', {
    message: 'The productId must be a valid UUID.',
  })
  productId: string;

  @ApiProperty({
    description: 'Quantity of the product',
    type: Number,
  })
  @IsNumber()
  @Min(1, {
    message: 'The quantity must be equal to or greater than 1.',
  })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description:
      'Array of product and quantity objects associated with the order',
    type: [ProductQuantityDto],
  })
  @IsArray({ message: 'The products field must be an array.' })
  @ArrayNotEmpty({ message: 'The products array must not be empty.' })
  @ValidateNested({ each: true })
  @Type(() => ProductQuantityDto)
  products: ProductQuantityDto[];
}
