module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('statistics', Array.from(new Array(100000), faker), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('statistics', null, {});
  }
};

function faker() {
  return {
    consumer_id: 2,
    latitude: Math.random() * 80, 
    longitude: Math.random() * 40,
    device_id: Math.random() * 20,
    impression_fee: parseInt(Math.random() * 100),
    consumer_phone: '+380937921498',
    consumer_email: 'maks23@gmail.com',
    consumer_first_name: 'maks1',
    consumer_last_name: 'test1',
    consumer_address: 'test address1',
    consumer_address_second_line: 'test address 21',
    consumer_city: 'kharkiv',
    consumer_state: 'kharkiv-state1',
    consumer_zip: '600001',
    consumer_gender: 'male',
    consumer_birthday: '2020-05-20',
  };
}


