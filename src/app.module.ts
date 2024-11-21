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
  ],
  controllers: [AppController],
  providers: [AppService, BasicStrategy],
})
export class AppModule {}
