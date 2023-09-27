const { Op } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      if (!request.consumerId) return { ...request };
      
      const searchValues = request.consumerId.trim().split('|');
     
      const query = {
        consumerId: searchValues.map(i => `${i}`)
      };
    
      const { consumerId: a, ...newRequest } = request;
  
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          ...query
        }
      };
    }
  };
};