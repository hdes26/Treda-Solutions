import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './settings/validation';
import { DatabaseModule } from './database/database.module';
import { BasicStrategy } from './utils/strategies/basic';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './features/category/category.module';
import { AccessTokenStrategy } from './utils/strategies/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    {
      ...JwtModule.register({}),
      global: true,
    },
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, BasicStrategy, AccessTokenStrategy],
})
export class AppModule {}
