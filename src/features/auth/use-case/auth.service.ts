import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from '../core/dto/login.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role, User } from 'src/database/core/entities';
import { LoggerService } from 'src/settings/logger';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { comparePassword } from 'src/utils/functions';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(User)
    private readonly usersRepository: typeof User,
    private readonly logger: LoggerService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    try {
      const { email, password } = loginDto;
      const userFound = await this.usersRepository.findOne({
        where: { email },
        include: [
          {
            model: Role,
          },
        ],
      });
      if (!userFound) {
        throw new NotFoundException(`User not found.`);
      }
      const isMatch = comparePassword(password, userFound.password);

      if (!isMatch) {
        throw new BadRequestException('e-mail or password invalid');
      }

      const token = await this.getTokens(userFound);

      return { user: userFound, token };
    } catch (error) {
      this.logger.error(AuthService.name, error);
      throw error;
    }
  }

  private async getTokens(user: User): Promise<string> {
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
