const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.gender) return { ...request };
      const searchValues = request.gender.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      const { gender: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerGender: query
        }
      };
    }
  };
};
