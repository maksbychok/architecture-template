const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.phone) return { ...request };
      const searchValues = request.phone.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      const { phone: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerPhone: query
        }
      };
    }
  };
};
