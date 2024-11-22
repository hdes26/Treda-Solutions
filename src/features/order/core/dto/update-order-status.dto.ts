import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from 'src/database/core/enum';

export class UpdateOrderStatusDto {
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
