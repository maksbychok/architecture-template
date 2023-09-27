const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.email) return { ...request };
      const searchValues = request.email.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      const { email: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerEmail: query
        }
      };
    }
  };
};
