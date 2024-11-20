import { Sequelize } from 'sequelize-typescript';
import * as entities from './core/entities';
const entitiesLists = Object.values(entities);

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      sequelize.addModels(entitiesLists);
      await sequelize.sync();
      return sequelize;
    },
  },
];
