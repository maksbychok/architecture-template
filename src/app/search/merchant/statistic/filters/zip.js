const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.zip) return { ...request };
      const searchValues = request.zip.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      const { zip: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerZip: query
        }
      };
    }
  };
};
