const { Op } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.impressionFee) return { ...request };
      
      const searchValues = request.impressionFee.trim().split('|');
      const query = {
        'impressionFee': Sequelize.and(
          Sequelize.where(Sequelize.cast(Sequelize.col('impression_fee'), 'varchar'), {
            [Op.iLike]: {
              [Op.any]: searchValues.map(i => `%${i}%`)
            }
          })
        )
      };
      
      const { impressionFee: a, ...newRequest } = request;
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