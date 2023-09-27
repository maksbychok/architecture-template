/* eslint-disable no-underscore-dangle */
const { StatisticModel } = require('@models');
const NotFoundException = require('@exceptions/NotFound.exception');
const StatisticMapper = require('./Statistic.mapper');
const { Readable } = require('stream');
const { DEFAULT_BATCH_SIZE = 50000 } = process.env;

/**
 * Class representing a StatisticRepo
 * @class
 * @memberOf Libs.Statistic
 */
class StatisticRepo {
  /**
   * @constructs StatisticRepo
  */
  constructor() {
    this._mapper = new StatisticMapper();
    this._model = StatisticModel;
  }

  /**
   * Create Statistic object.
   * @param {Object} dto - The value object.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
  */
  create(dto, options = {}) {
    return this._model.create(
      this._mapper.toDatabase(dto),
      options
    );
  }

  /**
   * Get by filter.
   * @param {Object} filter - The value object.
   * @param {Object} select - The select value.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
  */
  find(filter = {}, select = {}, options = {}) {
    return this._model.findAll({
      ...filter,
      ...select,
      ...options
    });
  }


  /**
   * Get by filter.
   * @param {Object} filter - The value object.
   * @param {Object} select - The select value.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
  */
  findStream(filter = {}, select = {}, options = {}) {
    const inputStream = new Readable({
      read: function () {
      },
    });
    this.performSearch(this._model, inputStream, {
      batchSize: +DEFAULT_BATCH_SIZE,
      ...filter,
      ...select,
      ...options
    });
    return inputStream;
  }

  findAndCountAll(filter = {}, select = {}, options = {}) {
    return this._model.findAndCountAll({
      ...filter,
      ...select,
      ...options
    });
  }

  /**
   * Get by id.
   * @param {string} id - The objectId value.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
  */
  findById(id, options = {}) {
    return this._model.findByPk(id, options)
      .then(model => {
        if (!model) throw new NotFoundException(`Statistic model with id: ${id} not found`);
        return model;
      })
  }

  /**
   * Update by id or object.
   * @param {Object|Number} instance - The instance value.
   * @param {Object} dto - The fields object.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
  */
  update(instance, dto, options) {
    const id = instance.id || instance;
    return this._model.update(
      this._mapper.toDatabase(dto),
      {
        ...options,
        where: { id },
        returning: true,
        plain: true
      });
  }

  /**
   * @param {object} model - Sequelize model
   * @param {object} inputStream - readable stream object
   * @param {number} batchSize - size of batches to fetch from database
   * @param {number} limit - Sequelize limit parameter
   * @param {number} offset - Sequelize offset parameter
   * @param {object} params - other Sequelize parameters
   */
  async performSearch(model, inputStream, { batchSize = DEFAULT_BATCH_SIZE, limit, offset = 0, mapper, ...params }) {
    try {
      let max = limit;
      if (!max) {
        max = await model.count({ ...params, attributes: undefined, limit, offset });
      }
      const offsets = [];
      let start = offset;
      while (start < max) {
        offsets.push(start);
        start += batchSize;
      }
      for (const offset of offsets) {
        const difference = (batchSize + offset - max);
        const items = await model.findAll({
          ...params,
          offset,
          limit: difference > 0 ? batchSize - difference : batchSize,
        });
        const data = mapper instanceof Function ? items.map(mapper) : items;
        inputStream.push(JSON.stringify(data));
      }
      inputStream.push(null);
    } catch (err) {
      inputStream.destroy(err);
    }
  }


}

module.exports = StatisticRepo;
