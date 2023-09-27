const { StatisticExportStateModel } = require('@models');
const NotFoundException = require('@exceptions/NotFound.exception');
const StatisticExportStateMapper = require('./StatisticExportState.mapper');
const StatisticExportStateStatuses = require('./StatisticExportStateStatus.enum');

/**
 * Class representing a StatisticExportStateRepo
 * @class
 * @memberOf Libs.StatisticExportState
 */
class StatisticExportStateRepo {
  /**
   * @constructs StatisticExportStateRepo
   */
  constructor() {
    this._mapper = new StatisticExportStateMapper();
    this._context = {};
    this._model = StatisticExportStateModel;
  }

  /**
   * Create Plan object.
   * @param {Object} dto - The value object.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
   */
  create(dto, options = {}) {
    return this._model.create(this._mapper.toDatabase(dto), options);
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
   * Get by id.
   * @param {string} id - The objectId value.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
   */
  findById(id, options = {}) {
    return this._model.findByPk(id, options).then((model) => {
      if (!model)
        throw new NotFoundException(`State model with id: ${id} not found`);
      return model;
    });
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
    return this._model.update(this._mapper.toDatabase(dto), {
      ...options,
      where: { id },
      returning: true,
      plain: true,
    });
  }

  /**
 * destroy.
 * @param {Object} instance - The instance object.
 * @param {Object} options - The sequelize options fields.
 * @return {Promise} Promise object represents the response.
 */
  destroyByQuery(options) {
    return this._model.destroy({
      ...options,
    });
  }

  /**
   * destroy.
   * @param {Object} instance - The instance object.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
   */
  destroy(instance, options) {
    const id = instance.id || instance;
    return this._model.destroy({
      ...options,
      where: { id },
    });
  }
}

module.exports = StatisticExportStateRepo;
