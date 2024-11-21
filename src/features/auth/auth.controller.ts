import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './use-case/auth.service';
import { LoginDto } from './core/dto/login.dto';
import {
  ApiBadGatewayResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User login',
    description: 'User login. You will provide the email and password',
  })
  @ApiOkResponse({ description: 'User login successfully' })
  @ApiBadGatewayResponse({ description: 'Something happened' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
