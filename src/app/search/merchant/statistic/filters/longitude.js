const { Op } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.longitude) return { ...request };
      
      const searchValues = request.longitude.trim().split('|');
      const query = {
        'longitude': Sequelize.and(
          Sequelize.where(Sequelize.cast(Sequelize.col('longitude'), 'varchar'), {
            [Op.iLike]: {
              [Op.any]: searchValues.map(i => `%${i}%`)
            }
          })
        )
      };
      
      const { longitude: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          ...query
        }
      };
    }
  };
};