const { Op } = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.state) return { ...request };
      const searchValues = request.state.trim().split('|');
      const query = {
        [Op.iLike]: {
          [Op.any]: searchValues.map(i => `%${i}%`)
        }
      };
      const { state: a, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerState: query
        }
      };
    }
  };
};
