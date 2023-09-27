const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.city) return { ...request };
      const searchValues = request.city.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      const { city: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerCity: query
        }
      };
    }
  };
};
