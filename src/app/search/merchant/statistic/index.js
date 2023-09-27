const pipeline = require('@app/search/merchant/pipeline.js');
const paginatePipe = require('@app/search//merchant/statistic/paginate.pipe.js');
const orderPipe = require('@app/search/merchant/statistic/order.pipe.js');
const filters = require('@app/search/merchant/statistic/includeFilters.js');

function setPaginate(paginate) {
  const through = [];
  
  if (paginate) {
    through.push(paginatePipe())
  }
 
  return through;
}

module.exports = (params, paginate = true) => {
  return pipeline()
    .send(params)
    .through([
      ...setPaginate(paginate),
      orderPipe(),
      ...filters
    ])
    .process();
};

