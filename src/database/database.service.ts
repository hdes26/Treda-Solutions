import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as entities from './core/entities';

const entitiesLists = Object.values(entities);

export const databasePostgres = SequelizeModule.forRootAsync({
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
    };
  },
});
