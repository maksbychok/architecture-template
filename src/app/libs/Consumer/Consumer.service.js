/**
 * @namespace Libs.Consumer
 */
const bcrypt = require('bcrypt');
const BadRequestException = require('@exceptions/BadRequest.exception');

/**
 * Class representing a ConsumerService
 * @class
 * @memberOf Libs.Consumer
 */
class ConsumerService {
  /**
   * @constructs ConsumerService
   */
  constructor(consumerRepo) {
    this._consumerRepo = consumerRepo;
  }

  /**
   * Store consumer.
   * @param {Object} dto - The request dto.
   * @return {Promise} Promise object represents the response.
   */
  store(dto) {
    return this._consumerRepo.create(dto);
  }

  /**
   * Get consumer profile.
   * @param {Object} currentUser - The request user item.
   * @return {Promise} Promise object represents the response.
   */
  profile(currentUser) {
    const { id } = currentUser;
    return this._consumerRepo.findById(id);
  }

  /**
   * Send consumer verify sms.
   * @param {Object} phone - The phone user.
   * @return {Promise} Promise object represents the response.
   */
  sendVerifySMS(phone) {
    return;
  }

  /**
   *verify consumer sms.
   * @param {Object} phone - The user phone.
   * @param {Object} sms - The user sms.
   * @return {Promise} Promise object represents the response.
   */
  async verifySMS(phone, sms) {

    await this.phoneVerified(phone);
    
    return true;
  }

  /**
   * Change consumer password.
   * @param {Object|Number} instance - The consumer instance or id.
   * @param {Object} dto - The password fields.
   * @return {Promise} Promise object represents the response.
   */
  async changePassword(instance, dto) {
    const { oldPassword, newPassword } = dto;
    const id = instance.id || instance;
    const user = await this.getById(id);
    if (!bcrypt.compareSync(oldPassword, user.password)) {
      throw new BadRequestException('Bad old password');
    }
    return this._consumerRepo.update(user, {
      password: newPassword,
    });
  }

  /**
   * Update consumer by instance or id.
   * @param {Object|Number} instance - The consumer instance or id.
   * @param {Object} fields - The update fields.
   * @return {Promise} Promise object represents the response.
   */
  async update(instance, fields) {
    const { id } = instance;
    const consumer = await this.getById(id);
    const [_, updated] = await this._consumerRepo.update(consumer, fields);
    return updated;
  }

  /**
   * Consumer phone verified.
   * @param {Object|Number} instance - The consumer instance or id.
   * @param {Object} fields - The update fields.
   * @return {Promise} Promise object represents the response.
   */
  phoneVerified(phone) {
    return this._consumerRepo.findAndUpdate({ phone }, { verified: true });
  }

  /**
   * Get consumer by id.
   * @param {Object} id - The objectID item.
   * @return {Promise} Promise object represents the response.
   */
  getById(id) {
    return this._consumerRepo.findById(id);
  }

  /**
   * Get all consumers.
   * @return {Promise} Promise object represents the response.
   */
  all() {
    return this._consumerRepo.find({}, {}, { paranoid: true });
  }

  /**
   * Destroy consumer by instance or id.
   * @param {Object|Number} instance - The consumer instance or id.
   * @return {Promise} Promise object represents the response.
   */
  async destroy(instance) {
    const id = instance.id || instance;
    const consumer = await this.getById(id);
    await this._consumerRepo.destroy(consumer);
  }
}

module.exports = ConsumerService;
