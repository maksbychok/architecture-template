module.exports = (sequelize, DataTypes) => {
  const StatisticExportState = sequelize.define(
    'statistic_export_state',
    {
      fileName: {
        type: DataTypes.STRING,
        field: 'file_name',
      },
      path: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      format: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  StatisticExportState.associate = () => { };
  return StatisticExportState;
};
