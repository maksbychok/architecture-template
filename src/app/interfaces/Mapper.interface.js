/**
 * Abstract class representing a base Mapper interface.
 * @abstract
 * @class
 */
class Mapper {
  /**
   * Map data to db layer.
   * @abstract
   */
  toDatabase(values) {
    throw new Error(
      'Mapper it`s abstract class. You must override toDatabase method'
    );
  }

  /**
   * Map data to app layer.
   * @abstract
   */
  toEntity(values) {
    throw new Error(
      'Mapper it`s abstract class. You must override toEntity method'
    );
  }
}

module.exports = Mapper;
