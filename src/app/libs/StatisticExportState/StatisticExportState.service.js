const { isValid, ...StatisticExportStateStatuses } = require('./StatisticExportStateStatus.enum');
const BadRequestException = require('@exceptions/BadRequest.exception');
const Path = require('path');
const FileRemoveCommand = require('@libs/File/FileRemove.command');
const { sequelize } = require('@models');

/**
 * Class representing a StatisticExportStateService
 * @class
 * @memberOf Libs.StatisticExportState
 */
class StatisticExportStateService {
  /**
   * @constructs StatisticExportStateService
   */
  constructor(repo) {
    this._repo = repo;
  }

  /**
   * Create object. Store to DB and to Stripe.
   * @param {Object} dto - The plan object value.
   * @return {Promise} Promise object represents the response.
   */
  async create(dto) {
    return this._repo.create({
      ...dto,
      status: StatisticExportStateStatuses.IN_PROGRESS
    });
  }
  /**
   * Get all.
   * @return {Promise} Promise object represents the response.
  */

  all(filter) {
    return this._repo.find(filter, {}, {});
  }

  /**
   * Get by id.
   * @param {Object} id - The objectID item.
   * @param {Object} options - The options item.
   * @return {Promise} Promise object represents the response.
   */
  getById(id, options = {}) {
    return this._repo.findById(id, options);
  }

  /**
   * Update by id.
   * @param {Object|Number} instance - The instance.
   * @param {Object} fields - The update fields.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
   */
  async update(instance, fields, options = {}) {
    const id = instance.id || instance;
    const updateInstance = await this.getById(id);
    const updated = await this._repo
      .update(
        updateInstance,
        {
          ...fields,
        },
        options
      )
      .then(([_, upd]) => upd);
    return updated;
  }

  /**
  * Update by id or object.
  * @param {StatisticExportStateModel|Number} instance - The instance value.
  * @param {string} status - The fields object.
  * @param {Object} options - The sequelize options fields.
  * @return {Promise} Promise object represents the response.
  */
  setStatus(instance, status, options) {
    const isValidStatus = isValid(status);
    if (!isValidStatus) {
      throw new BadRequestException(`Passed status:${status} invalid`);
    };
    return this.update(instance, { status }, options);
  }

  /**
   * Destroy by where statement.
   * @param {Object} query - The options item.
   * @return {Promise} Promise object represents the response.
   */
  async destroyByQuery(query) {
    return this._repo.destroyByQuery(query);
  }


  /**
   * Destroy.
   * @param {object|number} instance - The instance object or id fields.
   * @param {Object} options - The options item.
   * @return {Promise} Promise object represents the response.
   */
  async destroy(instance, options) {
    const id = instance.id || instance;
    return sequelize.transaction(async (t) => {
      const item = await this.getById(id);
      const deleted = await this._repo.destroy(item, {
        transaction: t,
        ...options
      });
      this.clearFolder(item);
      return deleted;
    });
  }


  getFullPath(state) {
    const { path, fileName } = state;
    return Path.join(path, fileName);
  }

  clearFolder(state) {
    const path = this.getFullPath(state);
    new FileRemoveCommand([path]).execute();
  }
}

module.exports = StatisticExportStateService;
