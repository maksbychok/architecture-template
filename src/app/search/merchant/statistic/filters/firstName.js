const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.firstName) return { ...request };
      const consumerFirstNameSearchValues = request.firstName.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: consumerFirstNameSearchValues.map(i => `%${i}%`)
        }
      };
      const { firstName: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerFirstName: query
        }
      };
    }
  };
};
