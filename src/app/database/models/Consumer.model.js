const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Consumer = sequelize.define(
    'consumer',
    {
      phone: {
        type: DataTypes.STRING,
      },
      verified: {
        type: DataTypes.BOOLEAN,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
      },
      addressSecondLine: {
        type: DataTypes.STRING,
        field: 'address_second_line',
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      zip: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATEONLY,
      },
      deviceId: {
        type: DataTypes.STRING,
        field: 'device_id',
      },
    },
    {
    }
  );
  Consumer.associate = (models) => {
    // associations can be defined here
  };
  return Consumer;
};
