const { Op } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.latitude) return { ...request };
      
      const searchValues = request.latitude.trim().split('|');
      const query = {
        'latitude': Sequelize.and(
          Sequelize.where(Sequelize.cast(Sequelize.col('latitude'), 'varchar'), {
            [Op.iLike]: {
              [Op.any]: searchValues.map(i => `%${i}%`)
            }
          })
        )
      };
  
      const { latitude: a, ...newRequest } = request;
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