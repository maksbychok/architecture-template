const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.deviceId) return { ...request };
      
      const searchValues = request.deviceId.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      
      const { deviceId: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          deviceId: query
        }
      };
    }
  };
};