module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('statistics', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        consumer_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'consumers',
            key: 'id',
          },
          onDelete: 'SET NULL',
        },
        latitude: {
          defaultValue: 0,
          type: Sequelize.DECIMAL(10, 8),
        },
        longitude: {
          defaultValue: 0,
          type: Sequelize.DECIMAL(11, 8),
        },
        device_id: {
          type: Sequelize.STRING,
        },
        impression_fee: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        consumer_phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_email: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_first_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_last_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_address: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_address_second_line: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_city: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_state: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_zip: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_gender: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        consumer_birthday: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
      }) 
      .then(() => {
        return Promise.all([
          queryInterface.addIndex('statistics', ['device_id']),
          queryInterface.addIndex('statistics', ['consumer_id']),
        ]);
      });
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeIndex('statistics', ['device_id']),
      queryInterface.removeIndex('statistics', ['consumer_id']),
    ]).then(() => queryInterface.dropTable('statistics'));
  },
};
