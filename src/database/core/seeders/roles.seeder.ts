import { QueryInterface } from 'sequelize';
import { RoleNameEnum } from '../enum';
import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          id: uuidv4(),
          name: RoleNameEnum.ADMIN,
          description: 'Administrador con acceso total al sistema',
        },
        {
          id: uuidv4(),
          name: RoleNameEnum.CUSTOMER,
          description: 'Usuario con permisos básicos para realizar compras',
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'roles',
      {
        name: {
          [Sequelize.Op.in]: [RoleNameEnum.ADMIN, RoleNameEnum.CUSTOMER],
        },
      },
      {},
    );
  },
};
