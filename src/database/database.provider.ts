import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import * as entities from './core/entities';

const entitiesLists = Object.values(entities);

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('PGHOST'),
        port: configService.get<number>('PGPORT'),
        username: configService.get<string>('PGUSER'),
        password: configService.get<string>('PGPASSWORD'),
        database: configService.get<string>('PGDATABASE'),
      });

      sequelize.addModels(entitiesLists);

      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
