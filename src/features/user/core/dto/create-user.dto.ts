import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { RoleNameEnum } from 'src/database/core/enum';

export class CreateUserDto {
  @ApiProperty()
  @IsEnum(RoleNameEnum)
  @IsNotEmpty()
  role: RoleNameEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
