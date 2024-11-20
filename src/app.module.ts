import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './settings/validation';
import { DatabaseModule } from './database/database.module';
import { BasicStrategy } from './utils/strategies/basic';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, BasicStrategy],
})
export class AppModule {}
