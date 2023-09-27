const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.addressSecondLine) return { ...request };
      const searchValues = request.addressSecondLine.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      const { addressSecondLine: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerAddressSecondLine: query
        }
      };
    }
  };
};
