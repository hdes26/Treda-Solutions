import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './use-case/auth.service';
import { LoginDto } from './core/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
