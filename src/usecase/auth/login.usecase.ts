import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@domain/dtos';
import { ILoginUsecase } from '@domain/ports';
import { IUserRepository } from '@domain/repositories';
import { UserModel } from '@domain/models';
import { LoggerService } from '@infrastructure/config/logger';
import { PasswordService } from '@domain/services';

@Injectable()
export class LoginUsecase implements ILoginUsecase {
  constructor(
    private readonly configService: ConfigService,
    private readonly repository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly logger: LoggerService,
  ) {}

  async handle(payload: LoginDto): Promise<any> {
    try {
      const { email, password } = payload;
      const userFound = await this.repository.findOne({
        where: { email },
      });
      if (!userFound) {
        throw new NotFoundException(`User not found.`);
      }
      const isMatch = this.passwordService.comparePassword(
        password,
        userFound.password,
      );

      if (!isMatch) {
        throw new BadRequestException('e-mail or password invalid');
      }

      const token = await this.getTokens(userFound);

      return { user: userFound, token };
    } catch (error) {
      this.logger.error(LoginUsecase.name, error);
      throw error;
    }
  }

  private async getTokens(user: UserModel): Promise<string> {
    const payload = { id: user.id, name: user.name, roles: user.role.name };
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_KEY'),
        expiresIn: '12h',
      }),
    ]);
    return accessToken;
  }
}
