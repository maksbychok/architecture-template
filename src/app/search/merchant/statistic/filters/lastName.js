const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.lastName) return { ...request };
      const searchValues = request.lastName.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      const { lastName: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerLastName: query
        }
      };
    }
  };
};
