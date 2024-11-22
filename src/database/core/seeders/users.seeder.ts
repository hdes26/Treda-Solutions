import { QueryInterface, QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { encryptPassword } from 'src/utils/functions';
import { Role } from '../entities';
import { RoleNameEnum } from '../enum';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const roles = await queryInterface.sequelize.query<Role>(
      `SELECT id, name FROM roles WHERE name IN ('admin', 'customer');`,
      { type: QueryTypes.SELECT },
    );

    const adminRole = roles.find(
      (role: Role) => role.name === RoleNameEnum.ADMIN,
    );
    const customerRole = roles.find(
      (role: Role) => role.name === RoleNameEnum.CUSTOMER,
    );

    if (!adminRole || !customerRole) {
      throw new Error(
        'Roles ADMIN y CUSTOMER deben existir antes de ejecutar este seeder.',
      );
    }

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          name: 'Admin User',
          email: 'admin@treda.com',
          password: encryptPassword('Qwerty123*'),
          role_id: adminRole.id,
        },
        {
          id: uuidv4(),
          name: 'Customer User',
          email: 'customer@treda.com',
          password: encryptPassword('Qwerty123*'),
          role_id: customerRole.id,
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'users',
      {
        email: {
          [Sequelize.Op.in]: ['admin@treda.com', 'customer@treda.com'],
        },
      },
      {},
    );
  },
};
