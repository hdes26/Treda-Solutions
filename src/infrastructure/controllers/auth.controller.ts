import { LoginDto } from '@domain/dtos';
import { UserModel } from '@domain/models';
import { ILoginUsecase } from '@domain/ports';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: ILoginUsecase) {}

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async login(
    @Body() body: LoginDto,
  ): Promise<{ user: UserModel; token: string }> {
    return await this.loginUseCase.handle(body);
  }
}
