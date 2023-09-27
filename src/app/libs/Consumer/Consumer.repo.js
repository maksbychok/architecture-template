const { ConsumerModel } = require('@models');
const NotFoundException = require('@exceptions/NotFound.exception');
const ConsumerMapper = require('./Consumer.mapper');

/**
 * Class representing a ConsumerRepo
 * @class
 * @memberOf Libs.Consumer
 */
class ConsumerRepo {
  /**
   * @constructs ConsumerRepo
   */
  constructor() {
    this._model = ConsumerModel;
    this._mapper = new ConsumerMapper();
  }

  /**
   * Store object to database.
   * @param {Object} dto - The dto object.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
   */
  create(dto, options = {}) {
    return this._model.create(this._mapper.toDatabase(dto), options);
  }

  /**
   * Get Consumer by id from database.
   * @param {string} id - The objectId value.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
   */
  findById(id, options = {}) {
    return this._model.findByPk(id, options).then((model) => {
      if (!model)
        throw new NotFoundException(`Consumer model with id: ${id} not found`);
      return model;
    });
  }

  /**
   * Update Consumer object.
   * @param {Object|number} instance - The Consumer instance.
   * @param {Object} data - The Consumer update object.
   * @return {Promise} Promise object represents the response.
   */
  update(instance, data, options = {}) {
    const id = instance.id || instance;
    return this._model.update(this._mapper.toDatabase(data), {
      ...options,
      where: { id },
      returning: true,
      plain: true,
    });
  }

  /**
   * Get by filter.
   * @param {Object} filter - The value object.
   * @param {Object} data - The update value.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
   */
  findAndUpdate(filter = {}, data = {}, options = {}) {
    return this._model.update(this._mapper.toDatabase(data), {
      where: filter,
      ...options,
    });
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
      where: filter,
      attributes: select,
      ...options,
    });
  }

  /**
   * Destroy object.
   * @param {Object|number} instance - The instance.
   * @return {Promise} Promise object represents the response.
   */
  destroy(instance) {
    const id = instance.id || instance;
    return this._model.destroy({ where: { id } });
  }
}

module.exports = ConsumerRepo;