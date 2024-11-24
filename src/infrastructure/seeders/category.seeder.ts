import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: uuidv4(),
          name: 'Electronics',
          description:
            'Devices and gadgets including phones, laptops, and more',
        },
        {
          id: uuidv4(),
          name: 'Clothing',
          description: 'Apparel and accessories for all genders and ages',
        },
        {
          id: uuidv4(),
          name: 'Books',
          description:
            'Wide selection of fiction, non-fiction, and educational books',
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'categories',
      {
        name: {
          [Sequelize.Op.in]: ['Electronics', 'Clothing', 'Books'],
        },
      },
      {},
    );
  },
};
