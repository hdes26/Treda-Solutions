import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsDecimal(
    { decimal_digits: '0,2' },
    {
      message:
        'The price must be a decimal number with up to 2 decimal places.',
    },
  )
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
