const { Op } = require('sequelize');
const moment = require('moment');

module.exports = () => {
  return {
    handler(request) {

      if (!(request.birthdayFrom || request.birthdayTo)) return { ...request };

      const startDay = moment(request.birthdayFrom, 'YYYY-MM-DD').startOf('day');
      const endDay = moment(request.birthdayTo, 'YYYY-MM-DD').endOf('day');

      const from = startDay.format('YYYY-MM-DD');
      const to = endDay.format('YYYY-MM-DD');

      let query = {};

      if (from && to) {
        query = {
          [Op.between]: [from, to]
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

      const { birthdayFrom: a, birthdayTo: b, ...newRequest } = request;
      return {
        ...newRequest,
        where: {
          ...(newRequest.where || {}),
          consumerBirthday: query
        }
      };
    }
  };
};
