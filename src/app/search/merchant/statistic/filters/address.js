const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.address) return { ...request };
      const searchValues = request.address.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      const { address: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerAddress: query
        }
      };
    }
  };
};
