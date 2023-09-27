const { Op } = require('sequelize');
const moment = require('moment');

module.exports = () => {
  return {
    handler(request) {
      
      if (!(request.createdAtFrom || request.createdAtTo)) return { ...request };
      
      const startDay = moment(request.createdAtFrom, 'YYYY-MM-DD').startOf('day');
      const endDay = moment(request.createdAtTo, 'YYYY-MM-DD').endOf('day');
     
      const from = startDay;
      const to = endDay;

      let query = {};

      if (from && to) {
        query = {
          [Op.between]: [ from, to ]
        };
      } else if (from) {
        query = {
          [Op.gte]: from
        };
      } else if (to) {
         query = {
          [Op.lte]: to
        };
      }

      const { createdAtFrom: a, createdAtTo: b, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          createdAt: query
        }
      };
    }
  };
};
