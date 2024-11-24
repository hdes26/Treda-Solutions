import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import config from '@infrastructure/config/config';
import { validationSchema } from '@infrastructure/config/validation-schema';
import { CommonModule } from './common.module';
import { CoreModule } from './core.module';
import { JwtModule } from '@nestjs/jwt';
import * as entities from '@infrastructure/entities';

const entitiesLists = Object.values(entities).flat();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    {
      ...JwtModule.register({}),
      global: true,
    },
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          host: configService.get<string>('PGHOST'),
          port: configService.get<number>('PGPORT'),
          username: configService.get<string>('PGUSER'),
          password: configService.get<string>('PGPASSWORD'),
          database: configService.get<string>('PGDATABASE'),
          logging: false,
          models: entitiesLists,
          synchronize: true,
          autoLoadModels: true,
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        };
      },
    }),
    CommonModule,
    CoreModule,
  ],
})
export class AppModule {}
