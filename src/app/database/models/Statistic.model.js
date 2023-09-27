module.exports = (sequelize, DataTypes) => {
  const Statistic = sequelize.define(
    'statistic',
    {
      consumerId: {
        type: DataTypes.INTEGER,
        field: 'consumer_id',
      },
      latitude: {
        defaultValue: 0,
        type: DataTypes.DECIMAL(10, 8),
      },
      longitude: {
        defaultValue: 0,
        type: DataTypes.DECIMAL(11, 8),
      },
      deviceId: {
        type: DataTypes.STRING,
        field: 'device_id',
      },
      impressionFee: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'impression_fee',
      },
      consumerPhone: {
        type: DataTypes.STRING,
        field: 'consumer_phone'
      },
      consumerEmail: {
        type: DataTypes.STRING,
        field: 'consumer_email'
      },
      consumerFirstName: {
        type: DataTypes.STRING,
        field: 'consumer_first_name'
      },
      consumerLastName: {
        type: DataTypes.STRING,
        field: 'consumer_last_name'
      },
      consumerAddress: {
        type: DataTypes.STRING,
        field: 'consumer_address'
      },
      consumerAddressSecondLine: {
        type: DataTypes.STRING,
        field: 'consumer_address_second_line'
      },
      consumerCity: {
        type: DataTypes.STRING,
        field: 'consumer_city'
      },
      consumerState: {
        type: DataTypes.STRING,
        field: 'consumer_state'
      },
      consumerZip: {
        type: DataTypes.STRING,
        field: 'consumer_zip'
      },
      consumerGender: {
        type: DataTypes.STRING,
        field: 'consumer_gender'
      },
      consumerBirthday: {
        type: DataTypes.DATEONLY,
        field: 'consumer_birthday'
      },
    },
    {}
  );
  Statistic.associate = ({ ConsumerModel }) => {
    Statistic.belongsTo(ConsumerModel);
  };
  return Statistic;
};
