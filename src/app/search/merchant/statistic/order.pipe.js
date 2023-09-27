const Sequelize = require('sequelize');

module.exports = () => {
  return {
    handler(request) {
      const order = [[getOrderField(request), request.order || 'asc']];
      const { orderBy: a, order: b, ...result } = request;
      return {
        ...result,
        order
      };
    }
  };
};
function getOrderField(request) {
  const field = request.orderBy || 'id';

  return ({
    'email':Sequelize.col('consumer.email'),
    'firstName':Sequelize.literal('\'consumer.firstName\''),
    'lastName':Sequelize.literal('\'consumer.lastName\''),
    'address':Sequelize.col('consumer.address'),
    'addressSecondLine':Sequelize.literal('\'consumer.addressSecondLine\''),
    'city':Sequelize.col('consumer.city'),
    'state':Sequelize.col('consumer.state'),
    'zip':Sequelize.col('consumer.zip'),
    'gender':Sequelize.col('consumer.gender'),
    'birthday':Sequelize.col('consumer.birthday'),
    'phone':Sequelize.col('consumer.phone'),
    'deviceId':Sequelize.literal('\'consumer.deviceId\''),
  })[request.orderBy] || field;
}
